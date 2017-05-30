const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const util = require('util');

const Image = require('../models/Image')

router.get('/images', function(req, res, next) {
  Image.find({})
    .then(function(images) {
      res.send(images)
    });
});

router.post('/images', function(req, res, next) {
  let form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    if (err) {
      res.status(400).send('Error parsing form', err);
      return;
    }
    fs.readFile(files.file.path, function(err, data) {
      if (err) {
        res.status(400).send('Error parsing form', err);
        return;
      }
      if (data.length === 0) {
        res.status(400).send('No file provided');
        return;
      }
      console.log('Successfully received a ' + data.length + ' byte file');
      Image.create({ title: "my title", photo: data }, function(error) {
        if(err) {
          console.log('Upload failed...');
          return;
        }
        console.log('Upload successful!');
        return;
      });
      res.status(200).send('Success - hit back to upload again');
    });
  });


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
