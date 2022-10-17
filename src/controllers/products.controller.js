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

const update = async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  const { type, message } = await productsService.productsService.update(name, id);

  if (type === 'PRODUCT_NOT_FOUND') return res.status(404).json(message);
  if (type === 'INVALID_VALUE') return res.status(422).json(message);

  res.status(200).json(message);
};

module.exports = { listProducts, listById, createProduct, deleteById, update };