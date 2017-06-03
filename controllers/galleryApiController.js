const Gallery = require('../models/Gallery');

exports.getGalleries = (req, res) => {
  Gallery.find({})
    .then((gallery) => {
      res.json(gallery);
    });
};
