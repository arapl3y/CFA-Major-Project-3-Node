const express = require('express');
const router = express.Router();

router.get('/images', function(req, res) {
  res.send({
    type: 'GET'
  });
});

router.post('/images', function(req, res) {
  console.log(req.body);
  res.send({
    type: 'POST',
    name: req.body.name,
    type: req.body.type
  });
});

router.put('/images/:id', function(req, res) {
  res.send({
    type: 'PUT'
  });
});

router.delete('/images/:id', function(req, res) {
  res.send({
    type: 'DELETE'
  });
});

module.exports = router;
