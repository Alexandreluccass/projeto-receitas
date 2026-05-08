// middlewares/autenticacao.js
// Middleware JWT: protege qualquer rota que exija o aluno estar logado.
// Uso nas rotas: router.get('/rota-protegida', autenticacao, controller.metodo)

const jwt = require('jsonwebtoken');

const autenticacao = (req, res, next) => {
  // O token deve vir no header: Authorization: Bearer <token>
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({
      erro: 'Acesso negado. Token não fornecido.',
    });
  }

  // Separa "Bearer" do token em si
  const partes = authHeader.split(' ');

  if (partes.length !== 2 || partes[0] !== 'Bearer') {
    return res.status(401).json({
      erro: 'Formato de token inválido. Use: Bearer <token>',
    });
  }

  const token = partes[1];

  try {
    // Verifica assinatura e expiração do token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Injeta os dados do aluno na requisição para uso nos controllers
    req.aluno = payload; // { id, nome, email, iat, exp }

    next(); // Prossegue para o controller
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ erro: 'Token expirado. Faça login novamente.' });
    }
    return res.status(401).json({ erro: 'Token inválido.' });
  }
};

module.exports = autenticacao;
