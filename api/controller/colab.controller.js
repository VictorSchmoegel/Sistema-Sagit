const Colab = require('../model/colab.model');
const errorHandler = require('../middlewares/errorHandler');

const createColab = async (req, res, next) => {
  const { nome, cpf, rg, location } = req.body;

  if (!nome || !cpf || !rg || !location) {
    return next(errorHandler(401, 'Preencha todos os campos'));
  }

  try {
    if (await Colab.findOne({ cpf })) {
      return next(errorHandler(401, 'CPF já cadastrado'));
    }

    if (await Colab.findOne({ rg })) {
      return next(errorHandler(401, 'RG já cadastrado'));
    }

    const colab = new Colab({ nome, cpf, rg, location });
    await colab.save();
    res.status(201).json({ success: true, message: 'Colaborador cadastrado com sucesso!' });
  } catch (error) {
    next(error);
  }
};

const getColab = async (req, res, next) => {
  const { location } = req.params;
  try {
    const colabs = await Colab.find({ location });
    res.status(200).json(colabs);
  } catch (error) {
    next(error);
  }
};

const getColabById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const colab = await Colab.findById(id);
    res.status(200).json(colab);
  } catch (error) {
    next(error);
  }
};


module.exports = { createColab, getColab, getColabById };