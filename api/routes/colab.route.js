const express = require('express');
const router = express.Router();

const { createColab } = require('../controller/colab.controller');

router.post('/create', createColab);

module.exports = router;