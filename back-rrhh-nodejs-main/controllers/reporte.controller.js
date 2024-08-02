const reporteService = require('../services/reporte.service');

exports.getHorasTrabajadas = async (req, res, next) => {
  try {
    const { departamentoId, fechaInicio, fechaFin } = req.query;
    console.log('Parametros recibidos:', departamentoId, fechaInicio, fechaFin);

    const reporte = await reporteService.generarReporteHorasTrabajadas(departamentoId, fechaInicio, fechaFin);
    console.log('Reporte generado:', reporte);

    res.status(200).json(reporte);
  } catch (error) {
    next(error);
  }
};
