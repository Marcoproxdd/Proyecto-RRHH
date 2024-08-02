const { Permiso, Usuario } = require('../models');

class CalendarioService {
  async obtenerEventosCalendario() {
    const permisos = await Permiso.findAll({
      include: [
        {
          model: Usuario,
          attributes: ['nombres']
        }
      ]
    });

    const eventosPermisos = permisos.map(permiso => ({
      title: `${permiso.tipoPermiso} - ${permiso.Usuario.nombres}`,
      start: permiso.fechaInicio,
      end: permiso.fechaFin
    }));

    const usuarios = await Usuario.findAll();

    const eventosCumpleanios = usuarios.map(usuario => ({
      title: `Cumpleaños - ${usuario.nombres}`,
      start: usuario.cumpleanios,
      end: usuario.cumpleanios
    }));

    return [...eventosPermisos, ...eventosCumpleanios];
  }
}

module.exports = new CalendarioService();
