const express = require('express');
const produtoController = require('../controllers/produtoController');
const router = express.Router();

router.get('/', produtoController.findAll)
router.post('/', produtoController.create);
router.get('/:id', produtoController.getProduto, produtoController.retrieve);
router.patch('/:id', produtoController.getProduto, produtoController.update);
router.delete('/:id', produtoController.getProduto, produtoController.delete);

module.exports = router;