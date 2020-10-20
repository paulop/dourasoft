const express = require('express');
const pedidoController = require('../controllers/pedidoController');
const router = express.Router();

router.get('/', pedidoController.findAll)
router.post('/', pedidoController.create);
router.get('/:id', pedidoController.getPedido, pedidoController.retrieve);
router.patch('/:id', pedidoController.getPedido, pedidoController.update);
router.delete('/:id', pedidoController.getPedido, pedidoController.delete);

module.exports = router;