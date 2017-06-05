const Image = require('../models/Image');
const formidable = require('formidable');
const fs = require('fs');

// exports.getImagesByGallery = async (req, res) => {
//    const gallery = req.params.id
//    const imagesPromise = Gallery.getImageList();
//    const galleryPromise = Gallery.find({images: gallery.id});
//    const [images, galleries] = await Promise.all([imagesPromise, galleriesPromise]);
// }

// another idea:
//
// exports.getImageByGallery = (req, res) => {
//   Image.find({ galleryId: req.params.slug }, function(err, images) {
//     Gallery.findOne({ slug: req.params.slug }, function(err, gallery) {
//       res.render('show', { gallery: gallery, images: images })
//       res.json()
//     })
//   })
// }



// old show images function
//
// exports.showImages = (req, res) => {
//   Image.find({})
//     .then((images) => {
//       res.render('newImage', { images: images });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };


exports.getImageById = async (req, res) => {
  try {
    const image = await Image.findOne({ _id: req.params.id })
      .populate('artist');
    res.setHeader('Content-Type', 'image/png');
    res.send(image.photo);
  } catch(err) {
    throw Error(err);
  };
};

exports.addImage = (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(400).send('Error parsing form', err);
      return;
    }
    fs.readFile(files.file.path, (err, data) => {
      if (err) {
        res.status(400).send('Error parsing form', err);
        return;
      }
      if (data.length === 0) {
        res.status(400).send('No file provided');
        return;
      }
      console.log(`Successfully received a ${data.length} byte file`);
      console.log(req.params);
      Image.create({
        title: fields.title,
        photo: data,
        blurb: fields.blurb,
        artist: req.user.id,
        gallery: req.params.id
      }, function(err) {
        if (err) {
          req.flash('Image upload failed...')
          return;
        }
      });
      req.flash('Painting successfully added!');
      res.status(200).redirect('back');
    });
  });
};


 // function(err) {
 //        if (err) {
 //          req.flash('Image upload failed...')
 //          return;




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

// exports.deleteImage = (req, res) => {
//   Image.findByIdAndRemove({ _id: req.params.id })
//     .then((image) => {
//       console.log(`Image removed with an id of: ${image.id}`);
//       res.redirect('/');
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// API

exports.getApiImages = (req, res) => {
  Image.find({})
    .then((images) => {
      res.json(images);
    });
};
