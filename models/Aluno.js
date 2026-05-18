// models/Aluno.js

const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');

const Aluno = sequelize.define('Aluno', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  nome: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'O nome não pode ser vazio.' },
      len: { args: [2, 150], msg: 'O nome deve ter entre 2 e 150 caracteres.' },
    },
  },

  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: { msg: 'Este e-mail já está cadastrado.' },
    validate: {
      isEmail: { msg: 'Informe um e-mail válido.' },
      notEmpty: { msg: 'O e-mail não pode ser vazio.' },
    },
  },

  senha: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'A senha não pode ser vazia.' },
    },
  },

  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
},
{
  tableName: 'alunos',
  timestamps: true,
  underscored: true,

  hooks: {
    beforeCreate: async (aluno) => {
      if (aluno.senha) {
        const SALT_ROUNDS = 12;
        aluno.senha = await bcrypt.hash(aluno.senha, SALT_ROUNDS);
      }
    },
    beforeUpdate: async (aluno) => {
      if (aluno.changed('senha')) {
        const SALT_ROUNDS = 12;
        aluno.senha = await bcrypt.hash(aluno.senha, SALT_ROUNDS);
      }
    },
  },
});

Aluno.prototype.verificarSenha = async function (senhaTextoPlano) {
  return bcrypt.compare(senhaTextoPlano, this.senha);
};

module.exports = Aluno;