const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Title field is required'],
  },
  photo: Buffer,
  blurb: {
    type: String,
    trim: true,
  },
  artist: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an artist!',
  },
  gallery: {
    type: mongoose.Schema.ObjectId,
    ref: 'Gallery',
    required: 'You must supply a gallery',
  },
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;
