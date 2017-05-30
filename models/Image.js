const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title field is required'],
  },
  photo: Buffer
});

const Image = mongoose.model('image', ImageSchema);

module.exports = Image
