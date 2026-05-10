const expresss = require('express');
const router = expresss.Router();
const categoriaController = require('../controllers/categoriaController');

router.get('/categorias', categoriaController.listarCategorias);
router.post('/categorias', categoriaController.criarCategoria);
router.put('/categorias/:id', categoriaController.atualizarCategoria);
router.delete('/categorias/:id', categoriaController.excluirCategoria);

module.exports = router;