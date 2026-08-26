const Cliente = require('../models/cliente');

// GET /clientes — devuelve todos los registros
const obtenerTodos = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los clientes', detalle: error.message });
  }
};

// GET /clientes/:documento — devuelve un registro por su documento
const obtenerUno = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.documento);
    if (!cliente) {
      return res.status(404).json({ error: `No se encontró el cliente con documento ${req.params.documento}` });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el cliente', detalle: error.message });
  }
};

// POST /clientes — crea un nuevo registro con el documento proporcionado por el cliente
const crear = async (req, res) => {
  try {
    const { documento, nombre, apellido, email, telefono, direccion } = req.body;
    if (!documento) {
      return res.status(400).json({ error: 'documento es obligatorio' });
    }
    if (!nombre || !apellido || !email) {
      return res.status(400).json({ error: 'nombre, apellido y email son obligatorios' });
    }
    const nuevo = await Cliente.create({ documento, nombre, apellido, email, telefono, direccion });
    res.status(201).json(nuevo);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: `Ya existe un cliente con documento ${req.body.documento}` });
    }
    res.status(500).json({ error: 'Error al crear el cliente', detalle: error.message });
  }
};

// PUT /clientes/:documento — actualiza los campos de un registro existente (no el documento)
const actualizar = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.documento);
    if (!cliente) {
      return res.status(404).json({ error: `No se encontró el cliente con documento ${req.params.documento}` });
    }
    const { nombre, apellido, email, telefono, direccion } = req.body;
    if (!nombre || !apellido || !email) {
      return res.status(400).json({ error: 'nombre, apellido y email son obligatorios' });
    }
    await cliente.update({ nombre, apellido, email, telefono, direccion });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el cliente', detalle: error.message });
  }
};

// DELETE /clientes/:documento — elimina un registro por su documento
const eliminar = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.documento);
    if (!cliente) {
      return res.status(404).json({ error: `No se encontró el cliente con documento ${req.params.documento}` });
    }
    await cliente.destroy();
    res.json({ mensaje: 'Cliente eliminado', eliminado: cliente });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el cliente', detalle: error.message });
  }
};

module.exports = { obtenerTodos, obtenerUno, crear, actualizar, eliminar };
