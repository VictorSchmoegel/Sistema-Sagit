const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');

const { addPdf, downloadPdf } = require('../controller/pdf.controller');

router.post('/:id', upload.array('pdfs'), addPdf);
router.get('/:id/file/:fileIndex', downloadPdf);

module.exports = router;