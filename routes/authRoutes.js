// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /auth/login — rota pública (não passa pelo middleware de autenticação)
router.post('/login', authController.login);

module.exports = router;
