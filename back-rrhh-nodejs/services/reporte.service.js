const { Horario, Usuario, sequelize } = require('../models');
const { Op, literal } = require('sequelize');

class ReporteService {
  async generarReporteHorasTrabajadas(departamentoId, fechaInicio, fechaFin) {
    const reporte = await Horario.findAll({
      where: {
        idDepartamento: departamentoId,
        dia: {
          [Op.between]: [fechaInicio, fechaFin]
        }
      },
      include: [
        {
          model: Usuario,
          attributes: ['nombres']
        }
      ],
      attributes: [
        'dia',
        'horaEntrada',
        'horaSalida',
        [literal(`TIMESTAMPDIFF(HOUR, horaEntrada, horaSalida)`), 'horasTrabajadas']
      ]
    });

    return reporte.map(h => ({
      usuario: h.Usuario.nombres,
      dia: h.dia,
      horaEntrada: h.horaEntrada,
      horaSalida: h.horaSalida,
      horasTrabajadas: h.dataValues.horasTrabajadas
    }));
  }
}

module.exports = new ReporteService();
