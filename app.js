const express = require('express');
require('express-async-errors');
const cors = require('cors');
const app = express();
const config = require('./utils/config');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const mazeRouter = require('./controllers/mazes');

// connects to mongo db databse
mongoose.connect(config.MONGODB_URI)
    .then(() => {
      logger.info('Connected to MongoDB');
    })
    .catch((error) => {
      logger.error(`Error connecting to MongoDB: ${error.message}`);
    });

app.use(cors());
app.use(express.json());

app.use(middleware.errorHandler);

// app.use(checkJwt)


app.use('/api/mazes', mazeRouter);


module.exports = app;
