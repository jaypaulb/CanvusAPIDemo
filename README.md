# Basic Canvus REST API Demo

The project consists of two parts: `client` is a client-side react application
that implements the UI. `server` is a simple express web server that hosts the
client and proxies API calls to Canvus server.

# Requirements

* Canvus server with API access enabled

# Development

You need new enough nodejs. Project was developed with v12.14.1. If you don't
want to use system nodejs, you can download and setup local toolchain by:

`source toolchain.sh`

Create a configuration file `server/.env` to match your Canvus server:

```
CANVUS_SERVER_URL=https://canvus.example.com:8090
ACCESS_TOKEN=<access token>
```

To run the application in development mode, first start the server in one
terminal:

`cd server && npm install && npm run-script dev`

Then in another terminal run the client:

* `cd client && npm install && npm run-script start`

The application is reachable at `http://localhost:3000`.

# Deployment

Use Docker and `docker-compose`.

* Copy `ci/docker-compose.yml` to some folder where you want to host the
  application
* Create an `env` file to the same folder with `docker-compose.yml` to define
  parameters for the application:

```
CANVUS_SERVER_URL=https://canvus.example.com:8090
ACCESS_TOKEN=<access token>
```

* Run the application with `docker-compose up -d`
* Stop the application with `docker-compose down`

The application is reachable at `http://localhost:5000`.
