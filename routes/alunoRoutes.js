const express = require('express');
const router = express.Router();
const { autenticacao, apenasAdmin } = require('../middlewares/autenticacao');   
const alunoController = require('../controllers/alunoController');

router.use(autenticacao);

router.get('/', alunoController.listar);
router.get('/perfil', alunoController.perfil);

// Rotas apenas para admin
router.post('/', apenasAdmin, alunoController.criar);
router.delete('/:id', apenasAdmin, alunoController.deletar);

module.exports = router;    