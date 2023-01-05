const express = require('express');
require('dotenv').config();
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');

// swagger
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const routes = require('./routes/index');

// ! mixins
// db connections
const Db_connection = require('./mixins/db.mixins');
const LogResponseBody = require('./mixins/responseHandler.mixins');
const GlobalErrorHandler = require('./mixins/globalErrorHandler.mixins');

const swaggerOptions = require('./swagger');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process?.env?.DEV_START !== 'DEV') {
  app.use(Db_connection);
}

// swagger doc
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerJSDoc(swaggerOptions))
);

app.use(LogResponseBody);

app.use(routes);

app.use(GlobalErrorHandler);

if (process.env.DEV_START === 'DEV') {
  mongoose.connect(process.env.MONGODB_URL, (err) => {
    if (err) {
      return console.log('mongoose connection error');
    }
    return console.log('Connected to MongoDB');
  });
  const port = 4001;
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
}

module.exports = app;
