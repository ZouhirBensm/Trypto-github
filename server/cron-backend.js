const express = require('express')

const cronBackend_app_router = express.Router()


const task1RSS1Middleware = require('../middleware/cron-middleware/task1/RSS/task1_RSS_1.js')
const task1RSS2Middleware = require('../middleware/cron-middleware/task1/RSS/task1_RSS_2.js')
const task1RSS3Middleware = require('../middleware/cron-middleware/task1/RSS/task1_RSS_3.js')

const cronController = require('../controllers/cron-controller/task1/cron-controller.js')


// task1: RSS + openAI + Tweet All for the Bidblock Twitter account.


cronBackend_app_router.get('/task1', 
task1RSS1Middleware.mid1, 
task1RSS2Middleware.mid1,
task1RSS3Middleware.mid1,
cronController.cont1
)


cronBackend_app_router.use(
cronController.error_cont1
)



module.exports = cronBackend_app_router