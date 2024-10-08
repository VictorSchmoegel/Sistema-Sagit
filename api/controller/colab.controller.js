const Colab = require('../model/colab.model');
const errorHandler = require('../middlewares/errorHandler');
const multer = require('../middlewares/multer');

const createColab = async (req, res, next) => {
  const { nome, cpf, rg, location } = req.body;
  try {
    const colab = new Colab({ nome, cpf, rg, location });
    if (nome === '' || cpf === '' || rg === '' || location === '') {
      return res.status(400).json({ message: 'Preencha todos os campos' });
    }
    if (await Colab.findOne({ cpf })) {
      return res.status(400).json({ message: 'CPF já cadastrado' });
    }
    if (await Colab.findOne({ rg })) {
      return res.status(400).json({ message: 'RG já cadastrado' });
    }
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

const getColabByLocation = async (req, res, next) => {
  const { location } = req.params;
  try {
    const colab = await Colab.find({ location });
    return res.status(200).json(colab);
  } catch (error) {
    next(error)
  }
};

const addPdfFile = async (req, res, next) => {
  const { id } = req.params;
  const { name, expiryDate } = req.body;
  const file = req.file;

  if (!file || !name || !expiryDate) {
    return res.status(400).json({ message: 'Nome, data de validade e arquivo são obrigatórios' });
  }

  try {
    const pdf = {
      name,
      expiryDate: new Date(expiryDate), // Converte para Date aqui
      data: file.buffer,
    };

    const colab = await Colab.findByIdAndUpdate(
      id,
      { $push: { pdfs: pdf } },
      { new: true }
    );

    if (!colab) {
      return res.status(404).json({ message: 'Colab não encontrado' });
    }

    res.status(200).json({ message: 'PDF adicionado com sucesso', colab });
  } catch (error) {
    next(error);
  }
};

const deleteColab = async (req, res, next) => {
  const { id } = req.params;
  try {
    const colab = await Colab.findByIdAndDelete(id);
    if (!colab) {
      return res.status(404).json({ message: 'Colab not found' });
    }
    return res.status(200).json({ message: 'Colab deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createColab,
  getColabById,
  getAll,
  getColabByLocation,
  addPdfFile,
  deleteColab,
};