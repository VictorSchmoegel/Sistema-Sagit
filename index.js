const express = require('express');
const mongoose = require('mongoose');
const router = require('./api/routes/route');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const authRouter = require('./api/routes/auth.route.js');
const colabRouter = require('./api/routes/colab.route.js');
const pdfRouter = require('./api/routes/pdf.route.js');

const MONGO_URI = process.env.MONGO_URI;

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error(err);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/auth', authRouter);
app.use('/api/colab', colabRouter);
app.use('/api/pdf', pdfRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});