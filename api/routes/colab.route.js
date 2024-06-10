const express = require('express');
const router = express.Router();

const { createColab, getColab, getColabById, addPdfFile } = require('../controller/colab.controller');

router.post('/create', createColab);
router.get('/:location', getColab);
router.get('/colab/:id', getColabById);
router.post('/pdf/:id', addPdfFile);

module.exports = router;