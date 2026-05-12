const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
  receitaId: {
    type: Number,
    required: true,
  },
  alunoId: {
    type: Number,
    required: true,
  },
  nomeAluno: {
    type: String,
    required: true,
  },
  texto: {
    type: String,
    required: true,
    maxlength: 500,
  },
}, { timestamps: true });

module.exports = mongoose.model('Comentario', comentarioSchema);