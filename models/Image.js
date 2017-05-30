const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
  },
  type: {
    type: String
  }
});

const Image = mongoose.model('image', ImageSchema);

module.exports = Image;
