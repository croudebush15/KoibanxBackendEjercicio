const mongoose = require('mongoose');
const logger = require('./utils/logger');
mongoose.Promise = Promise;

const express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const config = require('config');
const basicAuth = require('./utils/basicAuth');
const errorHandler = require('./utils/errorHandler');

mongoose.connect('mongodb://' + config.get('mongodb.address') + '/' + config.get('mongodb.dbname'), { useNewUrlParser: true, useUnifiedTopology: true });
require('./utils/initializer').init();

app.use(express.json());
app.use(basicAuth);
app.use('/api', require('./routes/stores'));
app.use(errorHandler);

// Start the server
app.listen(config.get('port'));
logger.info('API initialized on port ' + config.get('port'));

module.exports = app
