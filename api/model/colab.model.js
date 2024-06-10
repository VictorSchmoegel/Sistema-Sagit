const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  data: {
    type: Buffer,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
});

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    minlenght: 4,
  },
  cpf: {
    type: Number,
    required: true,
    minlenght: 11,
  },
  rg: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  pdf: [pdfSchema],
}, { timestamps: true });

const Colab = mongoose.model('Colab', userSchema);

module.exports = Colab;