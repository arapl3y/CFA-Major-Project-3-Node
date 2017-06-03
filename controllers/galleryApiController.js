const Gallery = require('./models/Gallery');

exports.getGalleries = (req, res) => {
  Gallery.find({})
    .then(function(gallery) => {
      res.json(gallery);
    });
}
