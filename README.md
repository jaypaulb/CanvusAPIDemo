# Basic Canvus REST API Demo

The project consists of two parts: `client` is a client-side react application
that implements the UI. `server` is a simple express web server that hosts the
client and proxies API calls to Canvus server.

# Requirements

* Canvus server with API access enabled
* API access should be unauthenticated (no access token support)

# Development

* `cd client && npm run-script build`
* `cd ../server && ln -s ../client/public`
* `npm run-script dev`

The application is reachable at `http://localhost:5000`.

# Production

Use Docker and `docker-compose`.

* Copy `ci/docker-compose.yml` to some folder where you want to host the
  application
* Create an `env` file to the same folder with `docker-compose.yml` to define
  parameters for the application:

```
CANVUS_SERVER_URL=https://canvus.example.com:8090
```

* Run the application with `docker-compose up -d`
* Stop the application with `docker-compose down`

The application is reachable at `http://localhost:5000`.
