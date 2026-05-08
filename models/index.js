// models/index.js
// Ponto central: importa todos os models e define as associações (relacionamentos).
// SEMPRE importe os models a partir daqui nos controllers/routes.

const sequelize  = require('../config/database');
const Aluno      = require('./Aluno');
const Receita    = require('./Receita');
const Categoria  = require('./Categoria');
const Habilidade = require('./Habilidade');

// ─────────────────────────────────────────────────────────────────────────────
// 1. Receitas N:N Categorias
//    Tabela intermediária gerada automaticamente: receita_categorias
// ─────────────────────────────────────────────────────────────────────────────
Receita.belongsToMany(Categoria, {
  through: 'receita_categorias',
  foreignKey: 'receita_id',
  otherKey: 'categoria_id',
  as: 'categorias',
});

Categoria.belongsToMany(Receita, {
  through: 'receita_categorias',
  foreignKey: 'categoria_id',
  otherKey: 'receita_id',
  as: 'receitas',
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. Receitas N:N Alunos (responsáveis pela receita)
//    Tabela intermediária gerada automaticamente: receita_alunos
// ─────────────────────────────────────────────────────────────────────────────
Receita.belongsToMany(Aluno, {
  through: 'receita_alunos',
  foreignKey: 'receita_id',
  otherKey: 'aluno_id',
  as: 'alunos',
});

Aluno.belongsToMany(Receita, {
  through: 'receita_alunos',
  foreignKey: 'aluno_id',
  otherKey: 'receita_id',
  as: 'receitas',
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. Alunos N:N Habilidades  ← tabela intermediária COM ATRIBUTO EXTRA "nivel"
//    Usamos um Model explícito para a tabela intermediária.
// ─────────────────────────────────────────────────────────────────────────────
const { DataTypes } = require('sequelize');

// Model da tabela intermediária com o campo extra "nivel"
const AlunoHabilidade = sequelize.define('AlunoHabilidade', {
  nivel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: { args: [0],  msg: 'O nível mínimo é 0.'  },
      max: { args: [10], msg: 'O nível máximo é 10.' },
      isInt: { msg: 'O nível deve ser um número inteiro.' },
    },
  },
},
{
  tableName: 'aluno_habilidades',
  timestamps: true,
  underscored: true,
});

Aluno.belongsToMany(Habilidade, {
  through: AlunoHabilidade,
  foreignKey: 'aluno_id',
  otherKey: 'habilidade_id',
  as: 'habilidades',
});

Habilidade.belongsToMany(Aluno, {
  through: AlunoHabilidade,
  foreignKey: 'habilidade_id',
  otherKey: 'aluno_id',
  as: 'alunos',
});

// ─────────────────────────────────────────────────────────────────────────────
// Exporta tudo centralizado
// ─────────────────────────────────────────────────────────────────────────────
module.exports = {
  sequelize,
  Aluno,
  Receita,
  Categoria,
  Habilidade,
  AlunoHabilidade,
};
