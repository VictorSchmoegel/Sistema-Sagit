const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const { createColab, getColab, getColabById, addPdfFiles } = require('../controller/colab.controller');

router.post('/create', createColab);
router.get('/:location', getColab);
router.get('/colab/:id', getColabById);
router.post('/pdf/:id', upload.array('pdfs'), addPdfFiles);

module.exports = router;