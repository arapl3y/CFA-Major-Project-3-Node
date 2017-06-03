const Image = require('../models/Image');


exports.ImageHomePage = (req, res) => {
  Image.find({})
    .then((images) => {
      res.render('index', { images: images });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.showImage = (req, res) => {
  Image.findById({ _id: req.params.id })
    .then((image) => {
      res.setHeader('Content-Type', 'image/png');
      res.send(image.photo);
    })
    .catch((err) => {
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
  Image.findByIdAndRemove({ _id: req.params.id })
    .then((image) => {
      console.log(`Image removed with an id of: ${image.id}`);
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
};
