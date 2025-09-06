const { Router } = require('express');
const { ResponseApp, Response } = require('../../src/utils/handle_response');
const { PairController } = require('../controller')

const svRouter = new Router()

svRouter.post('/cache/pairs', Response(PairController.upPairs))

module.exports = svRouter