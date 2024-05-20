const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
    unique: true,
    minlenght: 4,
  },
  senha: {
    type: String,
    required: true,
    minlenght: 6,
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;