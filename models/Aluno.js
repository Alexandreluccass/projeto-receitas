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
},
{
  tableName: 'alunos',
  timestamps: true,
  underscored: true,

  // Hook: faz o hash da senha antes de criar OU atualizar o aluno
  hooks: {
    beforeCreate: async (aluno) => {
      if (aluno.senha) {
        const SALT_ROUNDS = 12;
        aluno.senha = await bcrypt.hash(aluno.senha, SALT_ROUNDS);
      }
    },
    beforeUpdate: async (aluno) => {
      // Só rehasha se o campo senha foi modificado na requisição
      if (aluno.changed('senha')) {
        const SALT_ROUNDS = 12;
        aluno.senha = await bcrypt.hash(aluno.senha, SALT_ROUNDS);
      }
    },
  },
});

/**
 * Método de instância: compara uma senha em texto plano com o hash salvo.
 * Uso: const valido = await aluno.verificarSenha(senhaDigitada);
 */
Aluno.prototype.verificarSenha = async function (senhaTextoPlano) {
  return bcrypt.compare(senhaTextoPlano, this.senha);
};

module.exports = Aluno;
