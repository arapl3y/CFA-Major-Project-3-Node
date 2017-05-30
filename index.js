const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/virtualgallery');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

// init routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next) {
  res.status(422).send({error: err.message})
});

app.listen(process.env.port || 3000, function(){
  console.log('Now listening for requests');
});

