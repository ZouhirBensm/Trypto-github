const express = require('express');
const cronBackend_app_router = express.Router();

const task1CheckTokenMiddleware1 = require('../middleware/cron-middleware/task1/Token/task1_Token_1.js');

// const task1RSSMiddleware1 = require('../middleware/cron-middleware/task1/RSS/task1_RSS_1.js');
// const task1RSSMiddleware2 = require('../middleware/cron-middleware/task1/RSS/task1_RSS_2.js');
// const task1RSSMiddleware3 = require('../middleware/cron-middleware/task1/RSS/task1_RSS_3.js');

const task1TwitterMiddleware1 = require('../middleware/cron-middleware/task1/Twitter/task1_Twitter_1.js');
// const task1TwitterMiddleware2 = require('../middleware/cron-middleware/task1/Twitter/task1_Twitter_2.js');
// const task1TwitterMiddleware3 = require('../middleware/cron-middleware/task1/Twitter/task1_Twitter_3.js');
// const task1TwitterMiddleware4 = require('../middleware/cron-middleware/task1/Twitter/task1_Twitter_4.js');
// const task1TwitterMiddleware5 = require('../middleware/cron-middleware/task1/Twitter/task1_Twitter_5.js');

// const task1openAIMiddleware1 = require('../middleware/cron-middleware/task1/openAI/task1_openAI_1.js');
// const task1openAIMiddleware2 = require('../middleware/cron-middleware/task1/openAI/task1_openAI_2.js');
// const task1openAIMiddleware3 = require('../middleware/cron-middleware/task1/openAI/task1_openAI_3.js');
// const task1openAIMiddleware4 = require('../middleware/cron-middleware/task1/openAI/task1_openAI_4.js');
// const task1openAIMiddleware5 = require('../middleware/cron-middleware/task1/openAI/task1_openAI_5.js');

const cronController = require('../controllers/cron-controller/task1/cron-controller.js')


cronBackend_app_router.get('/task1', 
task1CheckTokenMiddleware1.mid1, 
task1TwitterMiddleware1.mid1,
cronController.cont1
)

cronBackend_app_router.use(
cronController.error_cont1
)

module.exports = cronBackend_app_router