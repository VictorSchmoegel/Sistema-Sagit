const express = require('express');
const router = express.Router();

const { createColab, getColab, getColabById } = require('../controller/colab.controller');

router.post('/create', createColab);
router.get('/:location', getColab);
router.get('/colab/:id', getColabById);

module.exports = router;