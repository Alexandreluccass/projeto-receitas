// app.js — ponto de entrada da aplicação

require('dotenv').config();

const express = require('express');
const app = express();
const { sequelize } = require('./models');

// Middlewares globais
app.use(express.json());                         
app.use(express.urlencoded({ extended: true }));

//Rotas
app.use('/auth',     require('./routes/authRoutes'));
app.use('/receitas', require('./routes/receitaRoutes'));
app.use('/categorias', require('./routes/categoriaRoutes'));
app.use('/habilidades', require('./routes/habilidadeRoutes'));
app.use('/aluno/habilidades', require('./routes/alunoHabilidadeRoutes'));
app.use('/relatorios', require('./routes/relatorioRoutes'));
app.get('/', (req, res) => {
  res.json({ status: 'API online', versao: '1.0.0' });
app.use('/alunos', require('./routes/alunoRoutes'));
});

app.use((err, req, res, next) => {
  console.error('[Erro global]', err);
  res.status(err.status || 500).json({ erro: err.message || 'Erro interno.' });
});

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    // 1. Testa a conexão com o banco
    await sequelize.authenticate();
    console.log('Conexão com o PostgreSQL estabelecida com sucesso.');

    // 2. Sincroniza os models (cria as tabelas se não existirem)
    const syncOpcoes = process.env.NODE_ENV === 'development'
      ? { alter: true }   // ← atualiza colunas sem derrubar dados
      : {};               // ← produção: só cria tabelas novas, não altera

    await sequelize.sync(syncOpcoes);
    console.log(`✅ Tabelas sincronizadas (modo: ${JSON.stringify(syncOpcoes) || 'padrão'}).`);

    // 3. Inicia o servidor HTTP
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Falha ao iniciar o servidor:', error);
    process.exit(1); // Encerra o processo se não conseguir conectar ao banco
  }
};

iniciarServidor();
