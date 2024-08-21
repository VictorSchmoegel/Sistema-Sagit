const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');

const { addPdf, downloadPdf, deletePdf } = require('../controller/pdf.controller');

router.post('/:id', upload.array('pdfs'), addPdf);
router.get('/:id/file/:fileIndex', downloadPdf);
router.delete('/:id/file/:fileIndex', deletePdf);

module.exports = router;