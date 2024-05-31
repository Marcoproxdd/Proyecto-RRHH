class DepartamentoService {
    constructor({ DepartamentoModel }) {
      this.departamentoModel = DepartamentoModel;
    }
  
    async createDepartment(departmentData) {
      try {
        const department = await this.departamentoModel.create(departmentData);
        return department;
      } catch (error) {
        throw error; // Lanza el error para ser manejado por el controlador
      }
    }
  }
  
  module.exports = DepartamentoService;
  