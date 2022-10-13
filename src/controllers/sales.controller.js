const services = require('../services');

const getAll = async (req, res) => {
  const { message } = await services.salesService.getAll();

  res.status(200).json(message);
};

const listById = async (req, res) => {
  const { id } = req.params;
  const { type, response } = await services.salesService.getById(id);
  if (type) return res.status(404).json(response);
  res.status(200).json(response);
};

module.exports = { getAll, listById };