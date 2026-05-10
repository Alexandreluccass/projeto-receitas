const expresss = require('express');
const router = expresss.Router();
const categoriaController = require('../controllers/categoriaController');

router.get('/categorias', CategoriaController.listarCategorias);
router.post('/categorias', CategoriaController.criarCategoria);
router.put('/categorias/:id', CategoriaController.atualizarCategoria);
router.delete('/categorias/:id', CategoriaController.excluirCategoria);

module.exports = router;