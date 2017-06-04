const Gallery = require('../models/Gallery');


exports.addGallery = (req, res) => {
  res.render('addGallery', { title: 'Add Gallery' });
};

exports.createGallery = async (req, res) => {
  try {
    req.body.owner = req.user.id;
    const gallery = await(new Gallery(req.body)).save();
    req.flash('success_msg', `New gallery created: ${gallery.name}!`);
    res.redirect(`/galleries/${gallery.slug}`);
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

exports.editGallery = async (req, res) => {
  // Find the gallery given the id
  try {
    const gallery = await Gallery.findOne({ _id: req.params.id });
    res.render('editGallery', { title: `Edit ${gallery.name}`, gallery: gallery });
  } catch (err) {
    console.log(err);
  }
};

exports.updateGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true
    }).exec();
    req.flash('success_msg', `Successfully updated ${gallery.name}`);
    res.redirect(`/galleries/${gallery._id}/edit`);
  } catch (err) {
    throw Error(err);
  }
}

exports.showGalleries = async (req, res) => {
  // Query DB for list of all galleries
  try {
    const galleries = await Gallery.find();
    res.render('galleries', { title: 'Galleries', galleries: galleries });
  } catch (err) {
    throw Error(err);
  }

  // Gallery.find({})
  //   .then((galleries) => {
  //     res.render('galleries', { galleries: galleries });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

exports.showSingleGallery = (req, res) => {
  // should render a new page with gallery name and image upload form and display images
  Gallery.findById({ _id: req.params.id })
    .then((gallery) => {
      res.json(gallery);
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

