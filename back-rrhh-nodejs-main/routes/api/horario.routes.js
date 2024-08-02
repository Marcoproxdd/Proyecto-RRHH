const express = require('express');
const horarioController = require('../../controllers/horario.controller');

module.exports = () => {
  const router = express.Router();
  router.post('/', horarioController.create);
  router.get('/', horarioController.findAll);
  router.get('/departamento/:departamentoId', horarioController.findByDepartamento);
  router.get('/:id', horarioController.findById); // Nueva ruta para obtener un horario por ID
  router.put('/:id', horarioController.updateHorasExtra);
  router.get('/horas-extra', horarioController.findHorasExtra); // Ruta para obtener horas extra
  router.post('/horas-extra', horarioController.registrarHorasExtra); // Ruta para registrar horas extra
  router.put('/horas-extra/:id', horarioController.updateHorasExtra); // Ruta para actualizar horas extra
  router.delete('/:id', horarioController.deleteHorario);
  return router;
};
