const Image = require('../models/Image');


exports.homePage = (req, res) => {
  Image.find({})
    .then(function(images) {
      res.render('index', {images: images});
    })
    .catch(function(err) {
      console.log(err);
    });
}

exports.showImage = (req, res) => {
  Image.findById({_id: req.params.id})
    .then(function(image) {
      res.setHeader('Content-Type', 'image/png');
      res.send(image.photo);
    })
    .catch(function(err) {
      console.log(err);
    });
};

exports.deleteImage = (req, res) => {
  Image.findByIdAndRemove({_id: req.params.id})
    .then(function() {
      console.log(`Image removed with an id of: ${image.id}`);
      res.redirect('/');
    })
    .catch(function(err) {
      console.log(err);
    });
}
