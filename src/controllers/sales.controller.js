const services = require('../services');

const getAll = async (req, res) => {
  const { message } = await services.salesService.getAll();

  res.status(200).json(message);
};

const listById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await services.salesService.getById(id);
  if (type) return res.status(404).json(message);
  res.status(200).json(message);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await services.salesService.deleteById(id);

  if (type) return res.status(404).json(message);

  res.status(204).json();
};

module.exports = { getAll, listById, deleteById };