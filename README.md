# HydroGuardian

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
2. Fot backend module use:
   ```bash
   npm run start:dev
   ```

## Configuration

To configure the HydroGuardian application and connect it to the water quality monitoring station, follow these steps:

1. Open the configuration file `src/environments/environment.ts` and adjust URL's for your backend module.
2. Create `.env` file based on .env.example and adjust parameters such as the MQTT server address and InfluxDB database.
3. Install HydroGuardian Sentry on the target device and configure it according to the project's requirements.

## Technologies Used

- Angular
- NestJS
- MQTT
- InfluxDB

## Authors

This project was created and maintained by Hubert Madej @Silesian University of Technology.