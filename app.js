'use strict'

const express = require('express')
const api = require('./src/api')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/meanLogin', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected')
});

app.use('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Accept, Origin, Content-Type, access_token');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/', api)

// Setup a global error handler.
app.use((err, req, res, next) => {
    console.error(`Global error: ${JSON.stringify(err.stack)}`);
    res.status(500).json({
      message: err.message,
      error: process.env.NODE_ENV === 'production' ? {} : err,
    });
  });

// Set port.
app.set('port', process.env.PORT || 5000);

// Start listening on port.
const server = app.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${server.address().port}`);
});