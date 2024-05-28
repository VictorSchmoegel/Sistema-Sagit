const express = require('express');
const mongoose = require('mongoose');
const router = require('./api/routes/route');
require('dotenv').config();

const authRouter = require('./api/routes/auth.route.js');
const colabRouter = require('./api/routes/colab.route.js');

const MONGO_URI = process.env.MONGO_URI;

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
app.use(router);

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/auth', authRouter);
app.use('/api/colab', colabRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});