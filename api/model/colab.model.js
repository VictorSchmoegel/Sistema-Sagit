const mongoose = require('mongoose');

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
  pdf: {
    type: Buffer,
    required: false,
  },
}, { timestamps: true });

const Colab = mongoose.model('Colab', userSchema);

module.exports = Colab;