const { Router } = require('express');
const pair = require('./pairs');

const routerApp = new Router();

routerApp.use('/api', pair);

module.exports = routerApp;