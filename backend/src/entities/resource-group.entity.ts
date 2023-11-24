import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ResourceGroupEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({name: 'created_by', type: 'text'})
    createdBy: string;
}