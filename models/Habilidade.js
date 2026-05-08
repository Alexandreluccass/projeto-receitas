// models/Habilidade.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Habilidade = sequelize.define('Habilidade', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: { msg: 'Já existe uma habilidade com este nome.' },
    validate: {
      notEmpty: { msg: 'O nome da habilidade não pode ser vazio.' },
    },
  },
},
{
  tableName: 'habilidades',
  timestamps: true,
  underscored: true,
});

module.exports = Habilidade;
