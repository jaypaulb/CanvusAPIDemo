const express = require('express');
const proxy = require('express-http-proxy');

require('dotenv').config();

const apiUrl = process.env.CANVUS_SERVER_URL;

const app = express();

app.use(express.static('public'));
app.use('/', proxy(apiUrl, {
  limit: '100mb'
}));

module.exports = app;
