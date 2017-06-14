const Image = require('../models/Image');
const formidable = require('formidable');
const fs = require('fs');

exports.getImageById = async (req, res) => {
  try {
    const image = await Image.findOne({ _id: req.params.id })
      .populate('artist');
    res.setHeader('Content-Type', 'image/jpeg');
    res.send(image.photo);
  } catch (err) {
    throw Error(err);
  }
};

exports.addImage = (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err1, fields, files) => {
    if (err1) {
      res.status(400).send('Error parsing form', err1);
      return;
    }
    fs.readFile(files.file.path, (err2, data) => {
      if (err2) {
        res.status(400).send('Error parsing form', err2);
        return;
      }
      if (data.length === 0) {
        res.status(400).send('No file provided');
        return;
      }
      console.log(`Successfully received a ${data.length} byte file`);
      Image.create({
        title: fields.title,
        photo: data,
        blurb: fields.blurb,
        artist: req.user.id,
        gallery: req.params.id,
      }, (err) => {
        if (err) {
          req.flash('Image upload failed...');
        }
      });
      req.flash('Painting successfully added!');
      res.status(200).redirect('back');
    });
  });
};

// exports.editImage = async (req, res) => {
//   try {
//     const image = await Image.findOne({ _id: req.params.id });
//     confirmOwner(image, req.user);
//     res.render('editImage', { title: `Edit ${image.title}`, image: image });
//   } catch (error) {
//     throw Error(error);
//   }


// Image.findOne({ _id: req.params.id })
//   .then((image) => {
//     res.render('editImage', { image: image });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// };

// exports.updateImage = async (req, res) => {
//   try {
//     const image = await Image.findOneAndUpdate({ _id: req.params.id}, req.body, {
//     new: true,
//     runValidators: true
//     }).exec();
//     req.flash('success', `Successfully updated ${image.title}`);
//     res.redirect(`/images/${image._id}/edit`);
//   } catch (error) {
//     throw Error(error);
//   }


// Image.findOneAndUpdate({ _id: req.params.id },
//   req.body, { new: true })
//   .then((image) => {
//     res.redirect('/');
//   })
//   .catch((err) => {
//     console.log(err);
//   });
//   };

exports.deleteImage = async (req, res) => {
  try {
    const image = await Image.findByIdAndRemove({ _id: req.params.id });
    req.flash('Image successfully deleted!');
    res.redirect('back');
  } catch (error) {
    throw Error(error);
  }
};

// API

exports.getApiImages = async (req, res) => {
  try {
    let images = await Image.find({ gallery: req.query.galleryId });
    images = images.map((img) => {
      return { id: img.id, title: img.title };
    });
    res.json(images);
  } catch (err) {
    throw Error(err);
  }
};

exports.getApiImageById = async (req, res) => {
  try {
    const image = await Image.findOne({ _id: req.params.id });
    res.json(image);
  } catch (err) {
    throw Error(err);
  }
};
