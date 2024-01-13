import {AmqpConnection} from '@golevelup/nestjs-rabbitmq';
import {TimeSeriesPoint} from './interfaces/time-series-point.interface';
import {Mqtt5Client} from 'aws-crt/dist/native/mqtt5';
import {AwsIotMqtt5ClientConfigBuilder} from 'aws-crt/dist/native/aws_iot_mqtt5';
import {config} from 'dotenv';
import * as path from 'path';
import * as process from 'process';
import {Controller, OnModuleInit} from '@nestjs/common';

config();

@Controller()
export class MainDataIngestionController implements OnModuleInit {
    private client: Mqtt5Client;

    constructor(private readonly amqpConnection: AmqpConnection) {
    }

    async onModuleInit(): Promise<void> {
        this.client = this.createMqttClient();
        await this.subscribeToMqttTopic();
    }

    private createMqttClient(): Mqtt5Client {
        const endpoint = process.env.AWS_MQTT_ENDPOINT;
        const cert = path.resolve(
            __dirname,
            `../certs/${process.env.AWS_PEM_CERT_NAME}-certificate.pem.crt`,
        );
        const key = path.resolve(
            __dirname,
            `../certs/${process.env.AWS_PEM_CERT_NAME}-private.pem.key`,
        );

        const builder =
            AwsIotMqtt5ClientConfigBuilder.newDirectMqttBuilderWithMtlsFromPath(
                endpoint,
                cert,
                key,
            ).build();

        const client = new Mqtt5Client(builder);

        client.start();

        client.on('error', () => this.log('AWS IOT MQTT Connection error'));
        client.on('attemptingConnect', () =>
            this.log('AWS IOT MQTT trying to Connect...'),
        );
        client.on('connectionSuccess', () =>
            this.log('AWS IOT MQTT Connection successful'),
        );
        client.on('connectionFailure', (data) =>
            this.logError('AWS IOT MQTT Connection failed', data),
        );
        client.on('disconnection', () =>
            this.log('AWS IOT MQTT Connection disconnected'),
        );
        client.on('messageReceived', (rawPayload) =>
            this.handleMessage(rawPayload),
        );

        return client;
    }

    private log(message: string): void {
        console.log('-------------------------------------');
        console.log(message);
        console.log('-------------------------------------');
    }

    private logError(message: string): void {
        this.log(message);
    }

    private async handleMessage(rawPayload: any): Promise<void> {
        try {
            const buffer = rawPayload.message.payload as ArrayBuffer;
            const uint8Array = new Uint8Array(buffer);
            const jsonString = new TextDecoder().decode(uint8Array);
            const timeSeriesPoint = JSON.parse(jsonString) as TimeSeriesPoint;

            await this.amqpConnection.publish(
                'hg_data_ingestion',
                'hg_data_route',
                timeSeriesPoint,
            );

            console.log(timeSeriesPoint);
        } catch (e) {
            console.error(e);
        }
    }

    private async subscribeToMqttTopic(): Promise<boolean> {
        await this.client.subscribe({
            subscriptions: [
                {qos: 1, topicFilter: 'hydro-guardian/data_ingestion'},
            ],
        });
        return true;
    }
}
