const express = require('express');
const proxy = require('express-http-proxy');

require('dotenv').config();

const apiUrl = process.env.CANVUS_SERVER_URL;
const accessToken = process.env.ACCESS_TOKEN;

const app = express();

app.use(express.static('public'));
app.use('/', proxy(apiUrl, {
  limit: '100mb',
  parseReqBody: false,
  // eslint-disable-next-line
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    proxyReqOpts.headers['Private-Token'] = accessToken;
    return proxyReqOpts;
  }
}));

module.exports = app;
