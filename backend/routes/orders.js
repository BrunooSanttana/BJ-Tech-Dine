const express = require('express');
const router = express.Router();
const { Order } = require('../models'); // Certifique-se de que Order está importado
const { Op } = require('sequelize'); // Adicione esta linha


// Endpoint para criar um pedido
router.post('/', async (req, res) => {
  const { tableNumber, paymentMethod, items } = req.body;

  try {
    // Cria o pedido
    const order = await Order.create({
      tableNumber,
      paymentMethod,
      totalAmount: items.reduce((sum, item) => sum + item.total, 0), // Total do pedido
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Erro ao criar o pedido:', error);
    res.status(500).json({ error: 'Erro ao criar o pedido' });
  }
});

module.exports = router;
