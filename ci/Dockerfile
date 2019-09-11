FROM node:12.10-slim

WORKDIR /app/client

# Install dependencies first to utilize docker layers
COPY client/package*.json ./
RUN npm install --only=production

# Build client-side application
ADD client .
RUN npm run-script build
RUN mv build ../public

# Cleanup temporary client files
WORKDIR /app
RUN rm -rf client

# Build server
COPY server/package*.json ./
RUN npm install --only=production
ADD server ./

# Start the server
EXPOSE 5000
ENV NODE_ENV production

CMD [ "/usr/local/bin/node", "src/index.js" ]
