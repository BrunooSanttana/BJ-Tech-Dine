const express = require('express');
const router = express.Router();
const { Category, Product  } = require('../models');

// Rota para buscar todas as categorias
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
});

// Rota para criar uma nova categoria
router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ error: 'Erro ao criar categoria' });
  }
});

// Rota para buscar produtos por categoria
router.get('/:categoryId/products', async (req, res) => {
  const { categoryId } = req.params;
  try {
    const products = await Product.findAll({ where: { categoryId } });
    res.json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

module.exports = router;
