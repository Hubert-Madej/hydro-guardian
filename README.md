<img src="https://svgur.com/i/yo3.svg" alt="Hydro Guardian" style="height: 400px; object-fit: fill; width: 100%;" />

<p align="center">
  <a href="https://hubert-madej.github.io/hydro-guardian/backend/">
    <img src="http://jessemillar.github.io/view-in-swagger-button/button.svg" alt="View in Swagger">
  </a>
</p>

HydroGuardian is an application that enables monitoring and control of water quality using a mini water quality monitoring station. The application allows for remote monitoring of measurement results, data analysis, and station management.



## Requirements

Before getting started with the project, make sure you have the following software installed:

- Node.js (required version 18.13.0 or newer)
- Angular (required version 14)

## Installation

1. Clone the repository from GitHub and change to new directory:

   ```bash
   git clone https://github.com/your-username/hydro-guardian.git
   ```
   
   ```bash
   cd hydro-guardian/
   ```

2. Install all required dependencies in both Backend and Client module

   ```bash
   cd backend/
   npm i
   ```

   ```bash
   cd ../client
   npm i
   ```
   
## Running

To run the project, use the following command:

1. For client module use:
   ```bash
   ng serve
   ```
2. For backend module use:
   ```bash
   npm run start:dev
   ```
3. To run local development containers use command:
   ```bash
   docker compose -f docker-compose.dev.yml up -d
   ```

## Configuration

To configure the HydroGuardian application and connect it to the water quality monitoring station, follow these steps:

1. Open the configuration file `src/environments/environment.ts` and adjust URL's for your backend module.
2. Create `.env` file based on .env.example and adjust parameters such as the MQTT server address and InfluxDB database.
3. Install HydroGuardian Firmware on the target device and configure it according to the project's requirements.

## Code development requirements
#### Backend

- You should avoid using 'any'. Every property, argument etc. should have a valid type.
- Use try / catch mechanism for external HTTP requests and asynchronous communication.
- Before every commit run: 
   - `npm run lint`
   - `npm run format`
- Every new functionality that provides:
  - Endpoint,
  - Dto, Should be documented with Swagger Properties (Example in Auth Module).
- (NOT READY) Every new functionality that provides new logic should have unit test.

## Technologies Used

- Angular
- NestJS
- MQTT
- InfluxDB

## Authors

This project was created and maintained by Hubert Madej @Silesian University of Technology.