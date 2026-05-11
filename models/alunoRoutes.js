const express = require('express');
const router = express.Router();
const autenticacao = require('../middlewares/autenticacao');
const alunoController = require('../controllers/alunoController');

router.use(autenticacao);

router.get('/', alunoController.listar);
router.get('/perfil', alunoController.perfil);

module.exports = router;