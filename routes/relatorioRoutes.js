const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/relatorioController');

router.get('/habilidades', relatorioController.proporcaoHabilidades);

module.exports = router;
