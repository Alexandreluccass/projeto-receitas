require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const { sequelize } = require('./models');
const conectarMongoDB = require('./config/mongodb');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/auth',                            require('./routes/authRoutes'));
app.use('/receitas',                        require('./routes/receitaRoutes'));
app.use('/receitas/:receitaId/comentarios', require('./routes/comentarioRoutes'));
app.use('/categorias',                      require('./routes/categoriaRoutes'));
app.use('/habilidades',                     require('./routes/habilidadeRoutes'));
app.use('/alunos',                          require('./routes/alunoRoutes'));
app.use('/aluno/habilidades',               require('./routes/alunoHabilidadeRoutes'));
app.use('/relatorios',                      require('./routes/relatorioRoutes'));

app.get('/', (req, res) => {
  res.json({ status: 'API online', versao: '1.0.0' });
});

app.use((err, req, res, next) => {
  console.error('[Erro global]', err);
  res.status(err.status || 500).json({ erro: err.message || 'Erro interno.' });
});

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL conectado.');

    await conectarMongoDB();

    await sequelize.sync({ alter: true });
    console.log('✅ Tabelas sincronizadas e atualizadas no banco.');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Falha ao iniciar o servidor:', error);
    process.exit(1);
  }
};

iniciarServidor();