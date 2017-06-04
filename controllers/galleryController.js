const Gallery = require('../models/Gallery');


exports.addGallery = (req, res) => {
  res.render('editGallery', { title: 'Add Gallery' });
};

exports.createGallery = async (req, res) => {
  try {
    req.body.owner = req.user.id;
    const gallery = new Gallery(req.body);
    await gallery.save();
    req.flash('success_msg', 'Gallery created!');
    res.redirect('back');
  } catch (err) {
    throw Error(err);
  }

  // callback style
  //---------------
  // Gallery.create({
  //   title: req.body.title,
  //   description: req.body.description,
  //   owner: req.user._id,
  // }, (err) => {
  //   if (err) {
  //     res.status(400).send('Error creating gallery', err);
  //     return;
  //   }
  //   res.status(200).redirect('back');
  // });
};

exports.showGalleries = (req, res) => {
  Gallery.find({})
    .then((galleries) => {
      res.render('galleries', { galleries: galleries });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.showSingleGallery = (req, res) => {
  // should render a new page with gallery name and image upload form and display images
  Gallery.findById({ _id: req.params.id })
    .then((gallery) => {
      res.render('gallery');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteGallery = (req, res) => {
  Gallery.findByIdAndRemove({ _id: req.params.id })
    .then((gallery) => {
      console.log(`Gallery removed with an id of: ${gallery.id}`);
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
};

// API

exports.getApiGalleries = (req, res) => {
  Gallery.find({})
    .then((gallery) => {
      res.json(gallery);
    });
};

