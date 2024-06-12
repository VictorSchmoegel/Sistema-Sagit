const Colab = require('../model/colab.model');
const path = require('path');

const addPdf = async (req, res) => {
  try {
    const { id } = req.params;
    const { names, expiryDates } = req.body;
    if (!req.files) {
      return res.status(400).json({ message: 'Arquivos não fornecidos' });
    }

    const files = req.files.map((file, index) => ({
      name: names[index],
      expiryDate: expiryDates[index],
      path: file.path,
    }));

    const updatedColab = await Colab.findByIdAndUpdate(id, {
      $push: { pdfs: { $each: files } },
    }, { new: true });

    res.status(201).json({ updatedColab });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const downloadPdf = async (req, res) => {
  const { id, fileIndex } = req.params;
  const colab = await Colab.findById(id);
  if (!colab || !colab.pdfs[fileIndex]) {
    return res.status(404).json({ message: 'Arquivo não encontrado' });
  }
  const filePath = path.join(__dirname, `../../${colab.pdfs[fileIndex].path}`);
  res.download(filePath);
};

module.exports = {
  addPdf,
  downloadPdf,
};