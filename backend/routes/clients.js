const express = require('express');
const router = express.Router();
const { Client } = require('../models');

// Rota para criar um novo cliente
router.post('/', async (req, res) => {
  const { name, cpf, phone } = req.body;

  // Validação básica
  if (!name || !cpf || !phone) {
    return res.status(400).json({ error: 'Nome, CPF e telefone são obrigatórios' });
  }

  try {
    // Criação do novo cliente
    const client = await Client.create({
      name,
      cpf,
      phone,
    });

    return res.status(201).json(client);
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    return res.status(500).json({ error: 'Erro ao criar cliente' });
  }
});

module.exports = router;
