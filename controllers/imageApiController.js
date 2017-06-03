// module to help parse multipart data from form
const formidable = require('formidable');
const fs = require('fs');
const passport = require('passport');

const Image = require('../models/Image');

exports.getImages = (req, res) => {
  Image.find({})
    .then(function(images) {
      res.send(images)
    });
}

exports.uploadImage = (req, res, next) => {
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

      Image.create({ title: fields.title, photo: data, artist: req.user._id }, function(err) {
        if(err) {
          console.log('Upload failed...');
          return;
        }
        console.log('Upload successful!');
        return;
      });
      res.status(200).redirect('/');
    });
  });
};

exports.deleteImage = (req, res, next) => {
   Image.findByIdAndRemove({_id: req.params.id})
    .then(function(image) {
      res.send(image);
    });
}
