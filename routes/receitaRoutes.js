// routes/receitaRoutes.js
// Exemplo de rotas protegidas — use como referência para as demais entidades.

const express = require('express');
const router = express.Router();
const autenticacao = require('../middlewares/autenticacao');

// ── Rotas PÚBLICAS ────────────────────────────────────────────────────────────
// (Exemplo: listar receitas sem precisar estar logado)
router.get('/', (req, res) => {
  // TODO: implementar ReceitaController.listar
  res.json({ mensagem: 'Lista de receitas (pública)' });
});

// ── Rotas PROTEGIDAS (exigem token JWT) ───────────────────────────────────────
router.use(autenticacao); // Tudo abaixo desta linha exige autenticação

router.post('/', (req, res) => {
  // req.aluno já está disponível aqui (injetado pelo middleware)
  // TODO: implementar ReceitaController.criar
  res.json({ mensagem: `Receita criada pelo aluno ID ${req.aluno.id}` });
});

router.put('/:id', (req, res) => {
  // TODO: implementar ReceitaController.atualizar
  res.json({ mensagem: `Receita ${req.params.id} atualizada` });
});

router.delete('/:id', (req, res) => {
  // TODO: implementar ReceitaController.deletar
  res.json({ mensagem: `Receita ${req.params.id} deletada` });
});

module.exports = router;
