const Colab = require('../model/colab.model');
const errorHandler = require('../middlewares/errorHandler');

const createColab = async (req, res, next) => {
  const { nome, cpf, rg } = req.body;

  if (!nome || !cpf || !rg) {
    return next(errorHandler(401, 'Preencha todos os campos'));
  }

  try {
    const cpfExists = await Colab.findOne({ cpf });
    if (cpfExists) {
      return next(errorHandler(401, 'CPF já cadastrado'));
    }
    const rgExists = await Colab.findOne({ rg });
    if (rgExists) {
      return next(errorHandler(401, 'RG já cadastrado'));
    }
    const colab = new Colab({ nome, cpf, rg });
    await colab.save();
    res.status(201).json({ success: true, message: 'Colaborador cadastrado com sucesso' });
  } catch (error) {
    return next(errorHandler(500, 'Erro ao cadastrar colaborador'));
  }

};

const getColab = async (req, res, next) => {
  try {
    const colabs = await Colab.find();
    res.status(200).json(colabs);
  } catch (error) {
    return next(errorHandler(500, 'Erro ao buscar colaboradores'));
  }
};


module.exports = { createColab, getColab };