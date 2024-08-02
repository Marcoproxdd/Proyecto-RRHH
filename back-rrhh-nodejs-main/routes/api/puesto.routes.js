const express = require('express');
const puestoController = require('../../controllers/puesto.controller');

module.exports = () => {
  const router = express.Router();
  router.post('/', puestoController.createPuesto);
  router.get('/', puestoController.getPuestos);
  router.get('/:id', puestoController.getPuestoById);
  router.put('/:id', puestoController.updatePuesto);
  router.delete('/:id', puestoController.deletePuesto);

  return router;
};
