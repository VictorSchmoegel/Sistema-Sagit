const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
});

const Pdf = mongoose.model('Pdf', pdfSchema);

module.exports = Pdf;