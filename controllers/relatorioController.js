const { Aluno, Habilidade, AlunoHabilidade, sequelize } = require('../models');

const relatorioController = {
  async proporcaoHabilidades(req, res) {
    try {
      const totalAlunos = await Aluno.count();

      const habilidades = await Habilidade.findAll({
        attributes: [
          'id',
          'nome',
          [
            sequelize.fn(
              'COUNT',
              sequelize.fn('DISTINCT', sequelize.col('alunos.id'))
            ),
            'total_alunos',
          ],
        ],
        include: [
          {
            model: Aluno,
            as: 'alunos',
            attributes: [],
            through: { attributes: [] },
          },
        ],
        group: ['Habilidade.id'],
        order: [['nome', 'ASC']],
        subQuery: false,
      });

      const relatorio = habilidades.map((h) => {
        const total = parseInt(h.get('total_alunos'), 10) || 0;
        const proporcao = totalAlunos > 0 ? total / totalAlunos : 0;
        return {
          id: h.id,
          nome: h.nome,
          total_alunos: total,
          total_geral_alunos: totalAlunos,
          proporcao: Number(proporcao.toFixed(4)),
          percentual: Number((proporcao * 100).toFixed(2)),
        };
      });

      res.json(relatorio);
    } catch (error) {
      console.error('Erro ao gerar relatório de habilidades:', error);
      res.status(500).json({ erro: 'Erro ao gerar relatório' });
    }
  },
};

module.exports = relatorioController;
