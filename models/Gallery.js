const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GallerySchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Title field is required'],
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Gallery = mongoose.model('gallery', GallerySchema);

module.exports = Gallery;
