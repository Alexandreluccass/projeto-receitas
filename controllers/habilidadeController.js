const { Habilidade } = require('../models');

const habilidadeController = {
  async listarHabilidades(req, res) {
    try {
      const habilidades = await Habilidade.findAll({ order: [['nome', 'ASC']] });
      res.json(habilidades);
    } catch (error) {
      console.error('Erro ao listar habilidades:', error);
      res.status(500).json({ erro: 'Erro ao listar habilidades' });
    }
  },

  async criarHabilidade(req, res) {
    try {
      const { nome } = req.body;
      const habilidade = await Habilidade.create({ nome });
      res.status(201).json(habilidade);
    } catch (error) {
      console.error('Erro ao criar habilidade:', error);
      res.status(400).json({ erro: error.message });
    }
  },

  async atualizarHabilidade(req, res) {
    try {
      const { id } = req.params;
      const { nome } = req.body;
      const habilidade = await Habilidade.findByPk(id);
      if (!habilidade) {
        return res.status(404).json({ erro: 'Habilidade não encontrada' });
      }
      await habilidade.update({ nome });
      res.json(habilidade);
    } catch (error) {
      console.error('Erro ao atualizar habilidade:', error);
      res.status(400).json({ erro: error.message });
    }
  },

  async excluirHabilidade(req, res) {
    try {
      const { id } = req.params;
      const habilidade = await Habilidade.findByPk(id);
      if (!habilidade) {
        return res.status(404).json({ erro: 'Habilidade não encontrada' });
      }
      await habilidade.destroy();
      res.json({ mensagem: 'Habilidade excluída com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir habilidade:', error);
      res.status(500).json({ erro: 'Erro ao excluir habilidade' });
    }
  },
};

module.exports = habilidadeController;
