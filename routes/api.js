const express = require('express');
const router = express.Router();
const Image = require('../models/Image')

router.get('/images', function(req, res, next) {
  Image.find({})
    .then(function(images) {
      res.send(images)
    });
});

router.post('/images', function(req, res, next) {
  Image.create(req.body)
    .then(function(image) {
      res.send(image);
    })
    .catch(next);
});

router.put('/images/:id', function(req, res, next) {
  Image.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(function() {
      Image.findOne({_id: req.params.id})
        .then(function(image) {
          res.send(image);
        });
    });
});

router.delete('/images/:id', function(req, res, next) {
  Image.findByIdAndRemove({_id: req.params.id})
    .then(function(image) {
      res.send(image);
    })
});

module.exports = router;
