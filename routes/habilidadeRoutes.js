const express = require('express');
const router = express.Router();
const HabilidadeController = require('../controllers/habilidadeController');

router.get('/habilidades', HabilidadeController.listarHabilidades);
router.post('/habilidades', HabilidadeController.criarHabilidade);
router.put('/habilidades/:id', HabilidadeController.atualizarHabilidade);
router.delete('/habilidades/:id', HabilidadeController.excluirHabilidade);

module.exports = router;