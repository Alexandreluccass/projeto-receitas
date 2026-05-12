const { Aluno, Habilidade, Receita, Categoria } = require('../models');

const alunoController = {

  async listar(req, res) {
    try {
      const alunos = await Aluno.findAll({
        attributes: ['id', 'nome', 'email'],
        order: [['nome', 'ASC']],
      });
      res.json(alunos);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar alunos' });
    }
  },

  async perfil(req, res) {
    try {
      const aluno = await Aluno.findByPk(req.aluno.id, {
        attributes: ['id', 'nome', 'email'],
        include: [
          { model: Habilidade, as: 'habilidades', attributes: ['id', 'nome'], through: { attributes: ['nivel'] } },
          { model: Receita, as: 'receitas', attributes: ['id', 'nome'], through: { attributes: [] },
            include: [{ model: Categoria, as: 'categorias', attributes: ['id', 'nome'], through: { attributes: [] } }],
          },
        ],
      });
      if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado' });
      res.json(aluno);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao buscar perfil' });
    }
  },
};

module.exports = alunoController;