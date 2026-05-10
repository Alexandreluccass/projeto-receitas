const express = require('express');
const router = express.Router();
const autenticacao = require('../middlewares/autenticacao');
const alunoHabilidadeController = require('../controllers/alunoHabilidadeController');

router.use(autenticacao);

router.get('/', alunoHabilidadeController.listarMinhas);
router.post('/', alunoHabilidadeController.vincular);
router.put('/:habilidadeId', alunoHabilidadeController.atualizarNivel);
router.delete('/:habilidadeId', alunoHabilidadeController.desvincular);

module.exports = router;
