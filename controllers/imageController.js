const Image = require('../models/Image');


exports.homePage = (req, res) => {
  Image.find({})
    .then(function(images) {
      res.render('index', { images: images });
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

// exports.editImage = (req, res) => {
//   Image.findOne({ _id: req.params.id })
//     .then((image) => {
//       res.render('editImage', { image: image });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// exports.updateImage = (req, res) => {
//   Image.findOneAndUpdate({ _id: req.params.id },
//     req.body, { new: true })
//     .then((image) => {
//       res.redirect('/');
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

exports.deleteImage = (req, res) => {
  Image.findByIdAndRemove({_id: req.params.id})
    .then(function(image) {
      console.log(`Image removed with an id of: ${image.id}`);
      res.redirect('/');
    })
    .catch(function(err) {
      console.log(err);
    });
}
