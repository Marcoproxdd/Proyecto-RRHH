const { Permiso, Usuario } = require('../models');
const { Op } = require('sequelize');

class PermisoService {
  async create(data) {
    return await Permiso.create(data);
  }

  async findAll() {
    return await Permiso.findAll();
  }

  async findByUsuario(usuarioId) {
    return await Permiso.findAll({
      where: { idUsuario: usuarioId },
      include: [
        {
          model: Usuario,
          attributes: ['nombres']
        }
      ]
    });
  }

  async approvePermiso(permisoId) {
    const permiso = await Permiso.findByPk(permisoId);
    if (!permiso) {
      throw new Error('Permiso not found');
    }

    const usuario = await Usuario.findByPk(permiso.idUsuario);

    // Verificar antigüedad del empleado
    const fechaIngreso = new Date(usuario.fechaIngreso);
    const fechaActual = new Date();
    const antiguedad = (fechaActual - fechaIngreso) / (1000 * 60 * 60 * 24 * 365); // Convertir milisegundos a años

    if (antiguedad < 1) {
      throw new Error('El empleado no cumple con el requisito de antigüedad para solicitar vacaciones.');
    }

    // Verificar disponibilidad de días de vacaciones
    const diasVacacionesDisponibles = Math.floor(antiguedad) * 15; // Asumimos 15 días por año trabajado
    const permisosTomados = await Permiso.findAll({
      where: {
        idUsuario: permiso.idUsuario,
        tipoPermiso: 'Vacaciones',
        estado: 'Aprobado'
      }
    });

    let diasTomados = 0;
    permisosTomados.forEach(p => {
      const diasPermiso = (new Date(p.fechaFin) - new Date(p.fechaInicio)) / (1000 * 60 * 60 * 24);
      diasTomados += diasPermiso;
    });

    const diasSolicitados = (new Date(permiso.fechaFin) - new Date(permiso.fechaInicio)) / (1000 * 60 * 60 * 24);

    if (diasTomados + diasSolicitados > diasVacacionesDisponibles) {
      throw new Error('El empleado no tiene suficientes días de vacaciones disponibles.');
    }

    // Eliminar verificación de solapamiento de permisos
    /*
    const permisosPendientes = await Permiso.findAll({
      where: {
        idUsuario: permiso.idUsuario,
        estado: 'Pendiente',
        [Op.or]: [
          {
            fechaInicio: {
              [Op.between]: [permiso.fechaInicio, permiso.fechaFin]
            }
          },
          {
            fechaFin: {
              [Op.between]: [permiso.fechaInicio, permiso.fechaFin]
            }
          }
        ]
      }
    });

    if (permisosPendientes.length > 0) {
      throw new Error('El empleado tiene permisos pendientes que se solapan con las fechas solicitadas.');
    }
    */

    permiso.estado = 'Aprobado';
    await permiso.save();
    return permiso;
  }
}

module.exports = new PermisoService();
