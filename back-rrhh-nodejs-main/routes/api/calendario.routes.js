// routes/api/calendario.routes.js
const express = require('express');
const calendarioController = require('../../controllers/calendario.controller');

module.exports = () => {
  const router = express.Router();
  router.get('/eventos', calendarioController.obtenerEventosCalendario);

  return router;
};
