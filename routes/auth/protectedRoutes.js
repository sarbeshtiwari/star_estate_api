// routes/protectedRoutes.js
const express = require('express');
const router = express.Router();
const { protectedRoute } = require('../../controllers/auth/protectedController');
const authenticateToken = require('../../middlewares/auth/authMiddleware');

router.get('/protected', authenticateToken, protectedRoute);

module.exports = router;
