const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Title field is required'],
  },
  photo: Buffer,
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Image = mongoose.model('image', ImageSchema);

module.exports = Image;
