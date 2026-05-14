const Comentario = require('../models/Comentario');

const comentarioController = {

  async listarPorReceita(req, res) {
    try {
      // CONVERSÃO NECESSÁRIA: O parâmetro vem como string, o Mongo espera Number
      const receitaId = Number(req.params.receitaId);
      
      const comentarios = await Comentario.find({ receitaId })
        .sort({ createdAt: -1 });
      res.json(comentarios);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar comentários' });
    }
  },

  async criar(req, res) {
    try {
      // CONVERSÃO NECESSÁRIA: Garantir que o ID da receita seja gravado como número
      const receitaId = Number(req.params.receitaId);
      const { texto } = req.body;

      if (!texto) {
        return res.status(400).json({ erro: 'O texto do comentário é obrigatório.' });
      }

      const comentario = await Comentario.create({
        receitaId, // Agora gravando como Number
        alunoId: req.aluno.id,
        nomeAluno: req.aluno.nome,
        texto,
      });

      res.status(201).json(comentario);
    } catch (error) {
      console.error('Erro no Mongo:', error);
      res.status(400).json({ erro: error.message });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;
      const comentario = await Comentario.findById(id);

      if (!comentario) {
        return res.status(404).json({ erro: 'Comentário não encontrado.' });
      }

      // IMPORTANTE: Garantir que a comparação de IDs funcione
      // req.aluno.id costuma ser Number, comentario.alunoId no Mongo pode vir como Number
      if (Number(comentario.alunoId) !== Number(req.aluno.id)) {
        return res.status(403).json({ erro: 'Você só pode deletar seus próprios comentários.' });
      }

      await comentario.deleteOne();
      res.json({ mensagem: 'Comentário deletado com sucesso.' });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao deletar comentário' });
    }
  },
};

module.exports = comentarioController;