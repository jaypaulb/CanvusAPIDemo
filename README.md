# Basic Canvus REST API Demo

The project consists of two parts: `client` is a client-side react application
that implements the UI. `server` is a simple express web server that hosts the
client and proxies API calls to Canvus server.

# Development

* `cd client && npm run-script build`
* `cd ../server && ln -s ../client/public`
* `npm run-script dev`

# Production

