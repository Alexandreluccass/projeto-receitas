const express = require('express');
const router = express.Router();
const habilidadeController = require('../controllers/habilidadeController');

router.get('/habilidades', habilidadeController.listarHabilidades);
router.post('/habilidades', habilidadeController.criarHabilidade);
router.put('/habilidades/:id', habilidadeController.atualizarHabilidade);
router.delete('/habilidades/:id', habilidadeController.excluirHabilidade);

module.exports = router;