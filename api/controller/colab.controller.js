const Colab = require('../model/colab.model');

const createColab = async (req, res, next) => {
  const { nome, cpf, rg } = req.body;
  const colab = new Colab({ nome, cpf, rg });
  try {
    await colab.save();
    res.status(201).json({ message: 'Colaborador cadastrado com sucesso!' });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

module.exports = { createColab };