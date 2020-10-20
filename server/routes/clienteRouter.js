const express = require('express');
const clienteController = require('../controllers/clienteController');
const router = express.Router();

router.get('/', clienteController.findAll)
router.post('/', clienteController.create);
router.get('/:id', clienteController.getCliente, clienteController.retrieve);
router.patch('/:id', clienteController.getCliente, clienteController.update);
router.delete('/:id', clienteController.getCliente, clienteController.delete);

module.exports = router;