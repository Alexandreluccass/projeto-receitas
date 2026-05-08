// models/Categoria.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: { msg: 'Já existe uma categoria com este nome.' },
    validate: {
      notEmpty: { msg: 'O nome da categoria não pode ser vazio.' },
    },
  },
},
{
  tableName: 'categorias',
  timestamps: true,
  underscored: true,
});

module.exports = Categoria;
