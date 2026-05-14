# 🍳 Projeto Receitas

## 📁 Repositório do Código

🔗 https://github.com/Alexandreluccass/projeto-receitas

---

# 👥 Equipe de Desenvolvimento

Projeto desenvolvido como requisito da disciplina de Programação Web Front-End da UTFPR.

| Integrante | RA |
|---|---|
| Camille Dal'Lin | a2648784 |
| Alexandre de Lucas | a2678284 |
| Julia Pivello | a2565684 |
| Mateus de Jesus Gonçalves | a2648903 |

---

# 🎯 Objetivo do Projeto

O Projeto Receitas é uma plataforma web desenvolvida para gerenciamento e compartilhamento de receitas culinárias. O sistema permite cadastro de usuários, criação de receitas, categorização, comentários e interação entre os participantes.

O objetivo principal é proporcionar uma experiência simples, organizada e intuitiva para compartilhamento de receitas e aprendizado culinário.

---

# 🛠️ Tecnologias Utilizadas

## Front-end
- HTML5
- CSS3
- JavaScript

## Back-end
- Node.js
- Express.js
- Sequelize
- PostgreSQL
- MongoDB
- Mongoose
- JWT
- Bcrypt

---

# 📂 Estrutura do Projeto

```bash
projeto-receitas/
│
├── config/
├── controllers/
├── middlewares/
├── models/
├── public/
├── routes/
├── app.js
├── package.json
└── package-lock.json
```

---

# ✅ Funcionalidades Implementadas

## Sistema Geral
- Cadastro de usuários
- Login e autenticação
- Cadastro de receitas
- Sistema de comentários
- Gerenciamento de categorias
- Perfil de usuário
- Relatórios

## Segurança
- Autenticação utilizando JWT
- Senhas criptografadas com Bcrypt
- Rotas protegidas

## Banco de Dados
- Persistência de dados com PostgreSQL
- Integração complementar com MongoDB

---

# 🚀 Como Executar Localmente

## 📥 1. Clonar o repositório

```bash
git clone https://github.com/Alexandreluccass/projeto-receitas.git
```

---

## 📂 2. Entrar no diretório do projeto

```bash
cd projeto-receitas
```

---

## 📦 3. Instalar as dependências

```bash
npm install
```

---

## ⚙️ 4. Configurar banco de dados

Configure as credenciais do PostgreSQL e MongoDB nos arquivos da pasta `config`.

---

## ▶️ 5. Executar o projeto

Modo normal:

```bash
npm start
```

Modo desenvolvimento:

```bash
npm run dev
```

---

# 🧩 Arquitetura MVC

O sistema segue o padrão MVC:

- **Models:** responsáveis pela comunicação com o banco de dados
- **Views:** interface visual da aplicação
- **Controllers:** responsáveis pela lógica do sistema

---

# 📖 Rotas Principais

| Funcionalidade | Rota |
|---|---|
| Usuários | `/alunos` |
| Login/Auth | `/auth` |
| Receitas | `/receitas` |
| Categorias | `/categorias` |
| Comentários | `/comentarios` |
| Habilidades | `/habilidades` |

---

# 📄 Licença

Distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais informações.
