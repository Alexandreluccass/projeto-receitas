const express = require('express');
const router = express.Router();
const { autenticacao } = require('../middlewares/autenticacao');
const receitaController = require('../controllers/receitaController');

router.get('/', receitaController.listarPublico);
router.get('/categoria/:id', receitaController.listarPorCategoria);
router.get('/:id', receitaController.buscarPorId);

router.use(autenticacao);

router.post('/', receitaController.criar);
router.put('/:id', receitaController.atualizar);
router.delete('/:id', receitaController.deletar);

module.exports = router;