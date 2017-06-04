const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GallerySchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Title field is required'],
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an owner!',
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

GallerySchema.virtual('images', {
  ref: 'Image', // which model to link?
  localField: '_id', // which field on the gallery
  foreignField: 'gallery', // which field on the image
});

const Gallery = mongoose.model('gallery', GallerySchema);

module.exports = Gallery;
