const { createContainer, asClass, asValue, asFunction } = require('awilix');
const { Sequelize } = require('sequelize');
// Config
const config = require('.');
// Routes
const Routes = require('../routes');
// Services

// Controllers

// Startup
const { Database, Server } = require('../startup');
// Routes
const {
  DepartamentoRoutes,
  UsuarioRoutes,
  PuestoRoutes,
  RolRoutes,
  HorarioRoutes,
  PermisoRoutes,
} = require('../routes/api/index');
// Models
const {
  Departamento,
  Puesto,
  Rol,
  Usuario,
  Horario,
  Permiso
} = require('../models');
const { protect } = require('../middleware/authMiddleware');
const AuthUtils = require('../utils/auth');

const container = createContainer();

container
  .register({
    // Configuración principal
    router: asFunction(Routes).singleton(),
    config: asValue(config),
    AuthUtils: asClass(AuthUtils).singleton(),
    Database: asClass(Database).singleton(),
    sequelize: asValue(new Sequelize(config.development)),
    Server: asClass(Server).singleton(),
  })
 
  .register({
    // Configuración de rutas
    DepartamentoRoutes: asFunction(DepartamentoRoutes).singleton(),
    UsuarioRoutes: asFunction(UsuarioRoutes).singleton(),
    PuestoRoutes: asFunction(PuestoRoutes).singleton(),
    RolRoutes: asFunction(RolRoutes).singleton(),
    HorarioRoutes: asFunction(HorarioRoutes).singleton(),
    PermisoRoutes: asFunction(PermisoRoutes).singleton(),
  })
  .register({
    // Configuración de modelos
    Departamento: asValue(Departamento),
    Puesto: asValue(Puesto),
    Rol: asValue(Rol),
    Usuario: asValue(Usuario),
    Horario: asValue(Horario),
    Permiso: asValue (Permiso),
  })
  .register({
    // Middlewares
    AuthMiddleware: asFunction(protect).singleton(),
  });

module.exports = container;
