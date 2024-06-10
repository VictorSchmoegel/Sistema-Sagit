const Colab = require('../model/colab.model');
const errorHandler = require('../middlewares/errorHandler');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

    const colab = new Colab({ nome, cpf, rg, location, pdf });
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

const addPdfFiles = async (req, res, next) => {
  const { id } = req.params;
  const files = req.files;
  const { expiryDates, names } = req.body;

  try {
    const pdfs = files.map((file, index) => ({
      name: names[index],
      data: file.buffer,
      expiryDate: new Date(expiryDates[index]),
    }));

    const colab = await Colab.findByIdAndUpdate(
      id,
      { $push: { pdfs: { $each: pdfs } } },
      { new: true }
    );

    res.status(200).json({ success: true, message: 'PDFs adicionados com sucesso', colab });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createColab,
  getColab,
  getColabById,
  addPdfFiles,
};