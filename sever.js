const sls = require('serverless-http');

const app = require('./index');

exports.app = sls(app);
