const { Aluno, Habilidade, AlunoHabilidade } = require('../models');

const alunoHabilidadeController = {
  async listarMinhas(req, res) {
    try {
      const aluno = await Aluno.findByPk(req.aluno.id, {
        include: [
          {
            model: Habilidade,
            as: 'habilidades',
            through: { attributes: ['nivel'] },
          },
        ],
      });

      if (!aluno) {
        return res.status(404).json({ erro: 'Aluno não encontrado' });
      }

      const habilidades = aluno.habilidades.map((h) => ({
        id: h.id,
        nome: h.nome,
        nivel: h.AlunoHabilidade.nivel,
      }));

      res.json(habilidades);
    } catch (error) {
      console.error('Erro ao listar habilidades do aluno:', error);
      res.status(500).json({ erro: 'Erro ao listar habilidades' });
    }
  },

  async vincular(req, res) {
    try {
      const { habilidade_id, nivel } = req.body;

      if (habilidade_id == null || nivel == null) {
        return res.status(400).json({ erro: 'habilidade_id e nivel são obrigatórios' });
      }

      const habilidade = await Habilidade.findByPk(habilidade_id);
      if (!habilidade) {
        return res.status(404).json({ erro: 'Habilidade não encontrada' });
      }

      const existente = await AlunoHabilidade.findOne({
        where: { aluno_id: req.aluno.id, habilidade_id },
      });
      if (existente) {
        return res.status(409).json({ erro: 'Habilidade já cadastrada para este aluno' });
      }

      const vinculo = await AlunoHabilidade.create({
        aluno_id: req.aluno.id,
        habilidade_id,
        nivel,
      });

      res.status(201).json({
        habilidade_id: vinculo.habilidade_id,
        nivel: vinculo.nivel,
      });
    } catch (error) {
      console.error('Erro ao vincular habilidade:', error);
      res.status(400).json({ erro: error.message });
    }
  },

  async atualizarNivel(req, res) {
    try {
      const { habilidadeId } = req.params;
      const { nivel } = req.body;

      if (nivel == null) {
        return res.status(400).json({ erro: 'nivel é obrigatório' });
      }

      const vinculo = await AlunoHabilidade.findOne({
        where: { aluno_id: req.aluno.id, habilidade_id: habilidadeId },
      });
      if (!vinculo) {
        return res.status(404).json({ erro: 'Vínculo não encontrado' });
      }

      await vinculo.update({ nivel });
      res.json({ habilidade_id: vinculo.habilidade_id, nivel: vinculo.nivel });
    } catch (error) {
      console.error('Erro ao atualizar nível:', error);
      res.status(400).json({ erro: error.message });
    }
  },

  async desvincular(req, res) {
    try {
      const { habilidadeId } = req.params;

      const vinculo = await AlunoHabilidade.findOne({
        where: { aluno_id: req.aluno.id, habilidade_id: habilidadeId },
      });
      if (!vinculo) {
        return res.status(404).json({ erro: 'Vínculo não encontrado' });
      }

      await vinculo.destroy();
      res.json({ mensagem: 'Habilidade removida do aluno' });
    } catch (error) {
      console.error('Erro ao desvincular habilidade:', error);
      res.status(500).json({ erro: 'Erro ao desvincular habilidade' });
    }
  },
};

module.exports = alunoHabilidadeController;
