const { Horario, Usuario } = require('../models');

exports.create = async (req, res, next) => {
  try {
    const horario = await Horario.create(req.body);
    res.status(201).json(horario);
  } catch (error) {
    next(error);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const horarios = await Horario.findAll();
    res.status(200).json(horarios);
  } catch (error) {
    next(error);
  }
};

// Horarios por departamento
exports.findByDepartamento = async (req, res, next) => {
  try {
    const { departamentoId } = req.params;
    const horarios = await Horario.findAll({
      include: [
        {
          model: Usuario,
          where: { idDepartamento: departamentoId }
        }
      ]
    });
    res.status(200).json(horarios);
  } catch (error) {
    next(error);
  }
};
