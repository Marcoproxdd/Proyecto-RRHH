const express = require('express');
const departamentoController = require('../../controllers/departamento.controller');

module.exports = () => {
  const router = express.Router();
  router.post('/', departamentoController.create);
  router.get('/', departamentoController.findAll);
  return router;
};
