const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');

const { getPdf, addPdf, downloadPdf } = require('../controller/pdf.controller');

router.route('/').get(getPdf).post(upload.single('file'), addPdf);
router.route('/download/:id').get(downloadPdf);

module.exports = router;