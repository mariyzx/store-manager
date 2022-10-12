const productsService = require('../services');

const listProducts = async (_req, res) => {
  const { message } = await productsService.getAll();
  
  res.status(200).json(message);
};

const listById = async (req, res) => {
  const { id } = req.params;
  const { type, response } = await productsService.getById(id);
  if (type) return res.status(404).json(response);
  res.status(200).json(response);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.createProduct(name);

  if (type) return res.status(422).json(message);

  res.status(201).json(message);
};

module.exports = { listProducts, listById, createProduct };