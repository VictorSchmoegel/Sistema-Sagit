const express = require('express');
const router = express.Router();

const { userSignup, userSignin } = require('../controller/auth.controller');

router.post('/signup', userSignup);
router.post('/signin', userSignin);

module.exports = router;