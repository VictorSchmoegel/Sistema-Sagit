const express = require('express');
const mongoose = require('mongoose');
const router = require('./api/routes/route');
require('dotenv').config();

const authRouter = require('./api/routes/auth.route');

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

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/auth', authRouter);