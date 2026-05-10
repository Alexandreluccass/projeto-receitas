const Categoria = require('../models/Categoria');

const categoriaController = {
    async listarCategorias(req, res) {
      try {
        const categorias = await Categoria.findAll();
        res.json(categorias);
      } catch (error) {
        console.error('Erro ao listar categorias:', error);
        res.status(500).json({ error: 'Erro ao listar categorias' });
      }
    },

    async criarCategoria(req, res) {
      try {
        const { nome } = req.body;
        const categoria = await Categoria.create({ nome });
        res.status(201).json(categoria);
      } catch (error) {
        console.error('Erro ao criar categoria:', error);
        res.status(500).json({ error: 'Erro ao criar categoria' });
      }
    },

    async atualizarCategoria(req, res) {
      try {
        const { id } = req.params;
        const { nome } = req.body;
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
          return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        await categoria.update({ nome });
        res.json(categoria);
      } catch (error) {
        console.error('Erro ao atualizar categoria:', error);
        res.status(500).json({ error: 'Erro ao atualizar categoria' });
      }
    },
    
    async excluirCategoria(req, res) {
      try {
        const { id } = req.params;
        const categoria = await Categoria.findByPk(id);
        if (!categoria) {
          return res.status(404).json({ error: 'Categoria não encontrada' });
        }
        await categoria.destroy();
        res.json({ message: 'Categoria excluída com sucesso' });
      } catch (error) {
        console.error('Erro ao excluir categoria:', error);
        res.status(500).json({ error: 'Erro ao excluir categoria' });
      }
    }
}

module.exports = {
    categoriaController
}