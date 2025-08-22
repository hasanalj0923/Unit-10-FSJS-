'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); 

// import routes
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');

// import database connection
const { sequelize } = require('./models');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// enable CORS for all routes
app.use(cors()); 

// enable JSON parsing for request bodies
app.use(express.json());

// setup morgan for HTTP request logging
app.use(morgan('dev'));

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// add routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${err.stack}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {}, // don’t leak stack trace to client
  });
});

// test database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection to the database was successful!');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
  }
})();

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});

module.exports = app;
