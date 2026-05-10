const express = require('express');
const router = express.Router();
const habilidadeController = require('../controllers/habilidadeController');

router.get('/', habilidadeController.listarHabilidades);
router.post('/', habilidadeController.criarHabilidade);
router.put('/:id', habilidadeController.atualizarHabilidade);
router.delete('/:id', habilidadeController.excluirHabilidade);

module.exports = router;
