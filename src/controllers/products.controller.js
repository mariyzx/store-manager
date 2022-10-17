const productsService = require('../services');

const listProducts = async (_req, res) => {
  const { message } = await productsService.productsService.getAll();
  
  res.status(200).json(message);
};

const listById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.productsService.getById(id);
  if (type) return res.status(404).json(message);
  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.productsService.createProduct(name);

  if (type) return res.status(422).json(message);

  res.status(201).json(message);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.productsService.deleteById(id);

  if (type) return res.status(404).json(message);

  res.status(204).json();
};

module.exports = { listProducts, listById, createProduct, deleteById };