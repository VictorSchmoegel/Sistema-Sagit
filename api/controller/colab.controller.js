const Colab = require('../model/colab.model');
const errorHandler = require('../middlewares/errorHandler');
const multer = require('multer');

const createColab = async (req, res, next) => {
  const { nome, cpf, rg, location } = req.body;
  try {
    const colab = new Colab({ nome, cpf, rg, location });
    await colab.save();
    return res.status(201).json(colab);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const colabs = await Colab.find();
    return res.status(200).json(colabs);
  } catch (error) {
    next(error);
  }
};

const getColabById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const colab = await Colab.findById(id);
    if (!colab) {
      return res.status(404).json({ message: 'Colab not found' });
    }
    return res.status(200).json(colab);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createColab,
  getColabById,
  getAll,
};