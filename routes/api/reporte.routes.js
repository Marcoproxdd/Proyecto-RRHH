const express = require('express');
const reporteController = require('../../controllers/reporte.controller');

module.exports = () => {
  const router = express.Router();
  router.get('/horas-trabajadas', reporteController.getHorasTrabajadas);
  
  return router;
};
