const { Aluno, Habilidade, Receita, Categoria } = require('../models');

const alunoController = {

  async listar(req, res) {
    try {
      const alunos = await Aluno.findAll({
        attributes: ['id', 'nome', 'email', 'is_admin'],
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
        attributes: ['id', 'nome', 'email', 'is_admin'],
        include: [
          {
            model: Habilidade,
            as: 'habilidades',
            attributes: ['id', 'nome'],
            through: { attributes: ['nivel'] },
          },
          {
            model: Receita,
            as: 'receitas',
            attributes: ['id', 'nome'],
            through: { attributes: [] },
            include: [
              {
                model: Categoria,
                as: 'categorias',
                attributes: ['id', 'nome'],
                through: { attributes: [] },
              },
            ],
          },
        ],
      });
      if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado' });
      res.json(aluno);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao buscar perfil' });
    }
  },

  async criar(req, res) {
    try {
      const { nome, email, senha, is_admin } = req.body;
      if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios.' });
      }
      const jaExiste = await Aluno.findOne({ where: { email } });
      if (jaExiste) {
        return res.status(400).json({ erro: 'E-mail já cadastrado.' });
      }
      const aluno = await Aluno.create({ nome, email, senha, is_admin: is_admin || false });
      res.status(201).json({ id: aluno.id, nome: aluno.nome, email: aluno.email, is_admin: aluno.is_admin });
    } catch (error) {
      res.status(400).json({ erro: error.message });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;
      if (parseInt(id) === req.aluno.id) {
        return res.status(400).json({ erro: 'Você não pode deletar sua própria conta.' });
      }
      const aluno = await Aluno.findByPk(id);
      if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado.' });
      await aluno.destroy();
      res.json({ mensagem: 'Aluno deletado com sucesso.' });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao deletar aluno.' });
    }
  },
};

module.exports = alunoController;