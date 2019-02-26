const mongoose = require('mongoose');
const speechSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
});

const Speech = mongoose.model('Speech', speechSchema);

module.exports = {
  Speech
};
