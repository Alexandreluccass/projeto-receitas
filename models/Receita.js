// models/Receita.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Receita = sequelize.define('Receita', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  nome: {
    type: DataTypes.STRING(200),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'O nome da receita não pode ser vazio.' },
      len: { args: [2, 200], msg: 'O nome deve ter entre 2 e 200 caracteres.' },
    },
  },

  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  link_externo: {
    type: DataTypes.STRING(500),
    allowNull: true,
    validate: {
      isUrl: { msg: 'O link externo deve ser uma URL válida.' },
    },
  },
},
{
  tableName: 'receitas',
  timestamps: true,
  underscored: true,
});

module.exports = Receita;
