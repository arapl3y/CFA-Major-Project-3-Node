const Gallery = require('../models/Gallery');
const User = require('../models/User');


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

const confirmOwner = (gallery, user) => {
  if (!gallery.owner.equals(user._id)) {
    throw Error('You must own a gallery in order to edit it');
  }
}

exports.editGallery = async (req, res) => {
  // Find the gallery given the id
  try {
    const gallery = await Gallery.findOne({ _id: req.params.id });
    confirmOwner(gallery, req.user);
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
    const galleries = await Gallery.find()
      .populate('owner');
    res.render('galleries', { title: 'Galleries', galleries: galleries, user: req.user });
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

exports.getGalleryBySlug = async (req, res, next) => {
  const gallery = await Gallery.findOne({ slug: req.params.slug })
    .populate('owner');
  if (!gallery) {
    next();
    return;
  }
  res.render('gallery', { gallery: gallery, title: gallery.name });

  // Gallery.findById({ _id: req.params.id })
  //   .then((gallery) => {
  //     res.json(gallery);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
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

