const User = require('../model/User.model');
const bcrypt = require('bcrypt');

const userSignup = async (req, res, next) => {
  const { usuario, senha } = req.body;
  const hashedPassword = bcrypt.hashSync(senha, 12);
  const user = new User({ usuario, senha: hashedPassword });
  try {
    await user.save();
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports = { userSignup };