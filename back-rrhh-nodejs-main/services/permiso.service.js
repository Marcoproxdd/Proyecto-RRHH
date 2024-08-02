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
          attributes: ['nombres', 'fechaIngreso']  // Asegúrate de incluir la fecha de ingreso
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

    permiso.estado = 'Aprobado';
    await permiso.save();
    return permiso;
  }

  async update(id, data) {
    const permiso = await Permiso.findByPk(id);
    if (!permiso) {
      throw new Error('Permiso not found');
    }
    await permiso.update(data);
    return permiso;
  }

  async delete(id) {
    const permiso = await Permiso.findByPk(id);
    if (!permiso) {
      throw new Error('Permiso not found');
    }
    await permiso.destroy();
  }

  async findBirthdayPermisos() {
    return await Permiso.findAll({
      where: {
        tipoPermiso: 'cumpleaños'
      }
    });
  }
}

module.exports = new PermisoService();
