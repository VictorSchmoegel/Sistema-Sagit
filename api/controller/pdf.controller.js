const Pdf = require('../model/pdf.model');
const path = require('path');

const getPdf = async (req, res, next) => {
  try {
    const pdf = await Pdf.find();
    res.status(200).json({ pdf });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addPdf = async (req, res, next) => {
  try {
    const { name, data } = req.body;
    if (!req.file) {
      return next(errorHandler(401, 'Selecione um arquivo'));
    }
    const pdf = req.file.path;
    const newPdf = await Pdf.create({ name, data: pdf });
    res.status(201).json({ newPdf });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const downloadPdf = async (req, res, next) => {
  const { id } = req.params;
  const pdf = await Pdf.findById(id);
  if (!pdf) {
    return next(errorHandler(404, 'Pdf não encontrado'));
  }
  const filePath = path.join(__dirname, `../../${pdf.data}`);
  res.download(filePath);
};

module.exports = {
  getPdf,
  addPdf,
  downloadPdf,
};