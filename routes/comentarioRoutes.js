const express = require('express');
const router = express.Router({ mergeParams: true });
const { autenticacao } = require('../middlewares/autenticacao');
const comentarioController = require('../controllers/comentarioController');

router.get('/', comentarioController.listarPorReceita);
router.post('/', autenticacao, comentarioController.criar);
router.delete('/:id', autenticacao, comentarioController.deletar);

module.exports = router;