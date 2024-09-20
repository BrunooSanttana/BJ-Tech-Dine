// routes/totalSales.js
const express = require('express');
const router = express.Router();
const db = require('../models');

// Endpoint para obter o total de vendas
router.get('/', async (req, res) => {
  try {
    // Calcula o total de vendas
    const totalSales = await db.OrderItem.sum('total');

    res.json({ totalSales });
  } catch (error) {
    console.error('Erro ao calcular o total de vendas:', error);
    res.status(500).json({ error: 'Erro ao calcular o total de vendas' });
  }
});

module.exports = router;
