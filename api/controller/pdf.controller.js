const Pdf = require('../model/pdf.model');
const path = require('path');

const getPdf = async (req, res) => {
  try {
    const pdf = await Pdf.find();
    res.status(200).json({ pdf });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addPdf = async (req, res) => {
  try {
    const { name } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'File not provided' });
    }
    const file = req.file.path;
    const newPdf = await Pdf.create({ name, file });
    res.status(201).json({ newPdf });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const downloadPdf = async (req, res) => {
  const { id } = req.params;
  const pdf = await Pdf.findById(id);
  if (!pdf) {
    return next(new Error("No item found"));
  }
  const file = pdf.file;
  const filePath = path.join(__dirname, `../../${file}`);
  res.download(filePath);
};

module.exports = {
  getPdf,
  addPdf,
  downloadPdf,
};