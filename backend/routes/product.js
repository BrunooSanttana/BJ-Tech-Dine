// routes/products.js
const express = require('express');
const router = express.Router();
const { Product, Category } = require('../models');

router.post('/', async (req, res) => {
  const { name, price, categoryId } = req.body; // Alterado para categoryId
  try {
    if (!categoryId) {
      return res.status(400).json({ error: 'Categoria não fornecida' });
    }

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({ error: 'Categoria não encontrada' });
    }

    const product = await Product.create({ name, price, categoryId });
    res.status(201).json(product);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
});

module.exports = router;
