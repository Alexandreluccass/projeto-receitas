const { Receita, Categoria, Aluno } = require('../models');

const receitaController = {

  async listarPublico(req, res) {
    try {
      const { categoria } = req.query;
      let receitaIds = null;
      if (categoria) {
        const matches = await Receita.findAll({
          attributes: ['id'],
          include: [{ model: Categoria, as: 'categorias', attributes: [], through: { attributes: [] }, where: { id: categoria }, required: true }],
          raw: true,
        });
        receitaIds = matches.map((m) => m.id);
        if (receitaIds.length === 0) return res.json([]);
      }
      const receitas = await Receita.findAll({
        where: receitaIds ? { id: receitaIds } : undefined,
        include: [
          { model: Categoria, as: 'categorias', attributes: ['id', 'nome'], through: { attributes: [] } },
          { model: Aluno, as: 'alunos', attributes: ['id', 'nome'], through: { attributes: [] } },
        ],
        order: [['nome', 'ASC']],
      });
      res.json(receitas);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar receitas' });
    }
  },

  async listarPorCategoria(req, res) {
    try {
      const { id } = req.params;
      const categoria = await Categoria.findByPk(id, {
        include: [{ model: Receita, as: 'receitas', through: { attributes: [] },
          include: [
            { model: Categoria, as: 'categorias', attributes: ['id', 'nome'], through: { attributes: [] } },
            { model: Aluno, as: 'alunos', attributes: ['id', 'nome'], through: { attributes: [] } },
          ],
        }],
      });
      if (!categoria) return res.status(404).json({ erro: 'Categoria não encontrada' });
      res.json({ categoria: { id: categoria.id, nome: categoria.nome }, receitas: categoria.receitas });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao filtrar receitas' });
    }
  },

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const receita = await Receita.findByPk(id, {
        include: [
          { model: Categoria, as: 'categorias', attributes: ['id', 'nome'], through: { attributes: [] } },
          { model: Aluno, as: 'alunos', attributes: ['id', 'nome'], through: { attributes: [] } },
        ],
      });
      if (!receita) return res.status(404).json({ erro: 'Receita não encontrada' });
      res.json(receita);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao buscar receita' });
    }
  },

  async criar(req, res) {
    try {
      // === AGORA PEGA OS INGREDIENTES ===
      const { nome, descricao, link_externo, ingredientes, categorias = [], alunos = [] } = req.body;
      if (!nome) return res.status(400).json({ erro: 'O nome da receita é obrigatório.' });
      
      // === SALVA OS INGREDIENTES AQUI ===
      const receita = await Receita.create({ nome, descricao, link_externo, ingredientes });
      
      const alunosIds = [...new Set([req.aluno.id, ...alunos])];
      await receita.setAlunos(alunosIds);
      if (categorias.length > 0) await receita.setCategorias(categorias);
      const receitaCompleta = await Receita.findByPk(receita.id, {
        include: [
          { model: Categoria, as: 'categorias', attributes: ['id', 'nome'], through: { attributes: [] } },
          { model: Aluno, as: 'alunos', attributes: ['id', 'nome'], through: { attributes: [] } },
        ],
      });
      res.status(201).json(receitaCompleta);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      // === AGORA PEGA OS INGREDIENTES AQUI TAMBÉM ===
      const { nome, descricao, link_externo, ingredientes, categorias, alunos } = req.body;
      const receita = await Receita.findByPk(id);
      if (!receita) return res.status(404).json({ erro: 'Receita não encontrada' });
      
      // === ATUALIZA OS INGREDIENTES AQUI ===
      await receita.update({ nome, descricao, link_externo, ingredientes });
      
      if (categorias !== undefined) await receita.setCategorias(categorias);
      if (alunos !== undefined) {
        const alunosIds = [...new Set([req.aluno.id, ...alunos])];
        await receita.setAlunos(alunosIds);
      }
      const receitaAtualizada = await Receita.findByPk(id, {
        include: [
          { model: Categoria, as: 'categorias', attributes: ['id', 'nome'], through: { attributes: [] } },
          { model: Aluno, as: 'alunos', attributes: ['id', 'nome'], through: { attributes: [] } },
        ],
      });
      res.json(receitaAtualizada);
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;
      const receita = await Receita.findByPk(id);
      if (!receita) return res.status(404).json({ erro: 'Receita não encontrada' });
      await receita.setAlunos([]);
      await receita.setCategorias([]);
      await receita.destroy();
      res.json({ mensagem: 'Receita excluída com sucesso.' });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao deletar receita' });
    }
  },
};

module.exports = receitaController;