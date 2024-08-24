// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { login, registerUser } = require('../../controllers/auth/authController');

router.post('/login', login);
router.post('/register', registerUser);

module.exports = router;
