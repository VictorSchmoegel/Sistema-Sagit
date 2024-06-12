const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const { createColab, getColabById, getAll, getColabByLocation } = require('../controller/colab.controller');

router.post('/create', createColab);
router.get('/all', getAll);
router.get('/:id', getColabById);
router.get('/location/:location', getColabByLocation);

module.exports = router;