const { createContainer, asClass, asValue, asFunction } = require('awilix');

const container = createContainer();

container
  .register({
    DepartamentoRoutes: asFunction(require('./api/v1.departamento')).singleton(),
    WorkScheduleRoutes: asFunction(require('./api/v1.workSchedule')).singleton(),
    PermissionRoutes: asFunction(require('./api/v1.permission')).singleton(),
   
  });

module.exports = container;
