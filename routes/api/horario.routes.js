const express = require('express');
const horarioController = require('../../controllers/horario.controller');

module.exports = () => {
  const router = express.Router();
  router.post('/', horarioController.create);
  router.get('/', horarioController.findAll);
  router.get('/departamento/:departamentoId', horarioController.findByDepartamento);
  return router;
};
