
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',

    pool: {
      max: 10,       
      min: 0,
      acquire: 30000,
      idle: 10000,    
    },

    logging: process.env.NODE_ENV === 'development' ? console.log : false,

    define: {
      freezeTableName: false,
      // Adiciona createdAt e updatedAt em todas as tabelas automaticamente
      timestamps: true,
      underscored: true, // snake_case nos campos do banco
    },
  }
);

module.exports = sequelize;
