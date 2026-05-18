const jwt = require('jsonwebtoken');

const autenticacao = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ erro: 'Acesso negado. Token não fornecido.' });
  }

  const partes = authHeader.split(' ');

  if (partes.length !== 2 || partes[0] !== 'Bearer') {
    return res.status(401).json({ erro: 'Formato de token inválido. Use: Bearer <token>' });
  }

  const token = partes[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.aluno = payload;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ erro: 'Token expirado. Faça login novamente.' });
    }
    return res.status(401).json({ erro: 'Token inválido.' });
  }
};

const apenasAdmin = (req, res, next) => {
  if (!req.aluno || !req.aluno.isAdmin) {
    return res.status(403).json({ erro: 'Acesso restrito a administradores.' });
  }
  next();
};

module.exports = { autenticacao, apenasAdmin };