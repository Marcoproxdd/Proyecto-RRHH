const express = require('express');
const departamentoController = require('../../controllers/departamento.controller');

module.exports = () => {
  const router = express.Router();
  router.post('/', departamentoController.createDepartamento);
  router.get('/', departamentoController.getDepartamentos);
  router.get('/:id', departamentoController.getDepartamentoById);
  router.put('/:id', departamentoController.updateDepartamento);
  router.delete('/:id', departamentoController.deleteDepartamento);
  return router;
};
