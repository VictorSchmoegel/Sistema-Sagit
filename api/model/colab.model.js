const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    minlenght: 4,
  },
  cpf: {
    type: String,
    required: true,
    minlenght: 11,
  },
  rg: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  pdfs: [
    {
      name: {
        type: String,
      },
      expiryDate: {
        type: Date,
      },
      data: {
        type: Buffer,
      },
    }
  ]
}, { timestamps: true });

const Colab = mongoose.model('Colab', userSchema);

module.exports = Colab;