const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// init routes
app.use('/api', require('./routes/api'));

app.listen(process.env.port || 3000, function(){
  console.log('Now listening for requests');
});

