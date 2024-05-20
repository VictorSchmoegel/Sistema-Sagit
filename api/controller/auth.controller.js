const User = require('../model/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorHandler = require('../middlewares/errorHandler');

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

const userSignin = async (req, res, next) => {
  const { usuario, senha } = req.body;
  try {
    const validUser = await User.findOne({ usuario });
    if (!validUser) return next(errorHandler(404, 'Usuário não encontrado!'));
    const validPassword = bcrypt.compareSync(senha, validUser.senha);
    if (!validPassword) next(errorHandler(401, 'Senha inválida!'));
    const token = jwt.sign({ usuario: validUser.usuario }, process.env.JWT_SECRET);
    const { senha: pass, ...rest } = validUser._doc;
    console.log(pass);
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  }
  catch (error) {
    next(error);
    console.log(error);
  }
};


module.exports = { userSignup, userSignin };