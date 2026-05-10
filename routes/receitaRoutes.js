const express = require('express');
const router = express.Router();
const autenticacao = require('../middlewares/autenticacao');
const receitaController = require('../controllers/receitaController');

router.get('/', receitaController.listarPublico);
router.get('/categoria/:id', receitaController.listarPorCategoria);

router.use(autenticacao);

router.post('/', (req, res) => {
  res.json({ mensagem: `Receita criada pelo aluno ID ${req.aluno.id}` });
});

router.put('/:id', (req, res) => {
  res.json({ mensagem: `Receita ${req.params.id} atualizada` });
});

router.delete('/:id', (req, res) => {
  res.json({ mensagem: `Receita ${req.params.id} deletada` });
});

module.exports = router;
