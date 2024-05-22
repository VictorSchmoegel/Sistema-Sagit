const express = require('express');
const router = express.Router();

const { createColab, getColab } = require('../controller/colab.controller');

router.post('/create', createColab);
router.get('/getcolab', getColab);

module.exports = router;