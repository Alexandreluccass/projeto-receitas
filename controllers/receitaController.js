const { Receita, Categoria, Aluno } = require('../models');

const receitaController = {
  async listarPublico(req, res) {
    try {
      const { categoria } = req.query;

      let receitaIds = null;
      if (categoria) {
        const matches = await Receita.findAll({
          attributes: ['id'],
          include: [
            {
              model: Categoria,
              as: 'categorias',
              attributes: [],
              through: { attributes: [] },
              where: { id: categoria },
              required: true,
            },
          ],
          raw: true,
        });
        receitaIds = matches.map((m) => m.id);
        if (receitaIds.length === 0) {
          return res.json([]);
        }
      }

      const receitas = await Receita.findAll({
        where: receitaIds ? { id: receitaIds } : undefined,
        include: [
          {
            model: Categoria,
            as: 'categorias',
            attributes: ['id', 'nome'],
            through: { attributes: [] },
          },
          {
            model: Aluno,
            as: 'alunos',
            attributes: ['id', 'nome'],
            through: { attributes: [] },
          },
        ],
        order: [['nome', 'ASC']],
      });

      res.json(receitas);
    } catch (error) {
      console.error('Erro ao listar receitas:', error);
      res.status(500).json({ erro: 'Erro ao listar receitas' });
    }
  },

  async listarPorCategoria(req, res) {
    try {
      const { id } = req.params;

      const categoria = await Categoria.findByPk(id, {
        include: [
          {
            model: Receita,
            as: 'receitas',
            through: { attributes: [] },
            include: [
              {
                model: Categoria,
                as: 'categorias',
                attributes: ['id', 'nome'],
                through: { attributes: [] },
              },
              {
                model: Aluno,
                as: 'alunos',
                attributes: ['id', 'nome'],
                through: { attributes: [] },
              },
            ],
          },
        ],
      });

      if (!categoria) {
        return res.status(404).json({ erro: 'Categoria não encontrada' });
      }

      res.json({
        categoria: { id: categoria.id, nome: categoria.nome },
        receitas: categoria.receitas,
      });
    } catch (error) {
      console.error('Erro ao filtrar receitas por categoria:', error);
      res.status(500).json({ erro: 'Erro ao filtrar receitas' });
    }
  },
};

module.exports = receitaController;
