const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const slug = require('slugs');

const GallerySchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name field is required'],
  },
  slug: String,
  description: {
    type: String,
    trim: true,
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

GallerySchema.pre('save', function(next) {
  if (!this.isModified('name')) {
    next();
    return;
  }
  this.slug = slug(this.name);
  next();
});

const Gallery = mongoose.model('gallery', GallerySchema);

module.exports = Gallery;
