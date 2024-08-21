const express = require('express');
const cors = require('cors');
const { User } = require('./models');
const helmet = require('helmet');



const app = express();
app.use(cors());
app.use(express.json());


app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-eval'"], // Adicione 'unsafe-eval' conforme necessário
      // Adicione outras diretivas conforme necessário
    }
  }
}));



// Rota de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    // Verificação de senha (ajuste conforme necessário)
    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Senha incorreta' });
    }

    return res.status(200).json({ message: 'Login confirmado com sucesso', user });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});

// Rota de registro
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verifique se o email já existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Criação do novo usuário
    const user = await User.create({
      username,
      email,
      password,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error('Erro ao criar um usuário:', error);
    return res.status(500).json({ error: 'Erro ao criar um usuário' });
  }
});