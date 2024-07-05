const Usuario = require('../models/usuario');

exports.create = async (req, res) => {
  try {
    const { nombres, identificacion, usuario, contraseña, departamentoId } = req.body;
    const user = await Usuario.create({ nombres, identificacion, usuario, contraseña, departamentoId });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
