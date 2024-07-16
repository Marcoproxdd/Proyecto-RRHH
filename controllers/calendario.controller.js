const { CalendarioService } = require('../services');

exports.obtenerEventosCalendario = async (req, res, next) => {
  try {
    const eventos = await CalendarioService.obtenerEventosCalendario();
    res.status(200).json(eventos);
  } catch (error) {
    next(error);
  }
};
