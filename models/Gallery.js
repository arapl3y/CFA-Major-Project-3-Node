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

GallerySchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
    next();
    return;
  }
  this.slug = slug(this.name);
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const galleriesWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (galleriesWithSlug.length) {
    this.slug = `${this.slug}-${galleriesWithSlug.length + 1}`;
  }

  next();
});

const Gallery = mongoose.model('Gallery', GallerySchema);

module.exports = Gallery;
