// controllers/authController.js

const jwt = require('jsonwebtoken');
const { Aluno } = require('../models');

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // 1. Validação básica dos campos recebidos
    if (!email || !senha) {
      return res.status(400).json({
        erro: 'E-mail e senha são obrigatórios.',
      });
    }

    // 2. Busca o aluno pelo e-mail
    const aluno = await Aluno.findOne({ where: { email } });

    if (!aluno) {
      // ⚠️ Mensagem genérica: não revela se o e-mail existe ou não (segurança)
      return res.status(401).json({
        erro: 'Credenciais inválidas.',
      });
    }

    // 3. Verifica a senha usando o método de instância definido no model
    const senhaCorreta = await aluno.verificarSenha(senha);

    if (!senhaCorreta) {
      return res.status(401).json({
        erro: 'Credenciais inválidas.',
      });
    }

    // 4. Gera o token JWT
    const payload = {
  id: aluno.id,
  nome: aluno.nome,
  email: aluno.email,
  isAdmin: aluno.is_admin,
};

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '8h',
    });

    // 5. Retorna o token e dados básicos do aluno (nunca retorne a senha!)
    return res.status(200).json({
      mensagem: 'Login realizado com sucesso.',
      token,
      aluno: {
            id: aluno.id,
            nome: aluno.nome,
            email: aluno.email,
            isAdmin: aluno.is_admin,
                                    },
    });

  } catch (error) {
    console.error('[AuthController] Erro no login:', error);
    return res.status(500).json({
      erro: 'Erro interno no servidor. Tente novamente.',
    });
  }
};

module.exports = { login };
