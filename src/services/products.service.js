const productsModel = require('../models');
const { validateId,
   validateName, validateProductExist } = require('./validations/validationsInputValues');

const getAll = async () => {
  const products = await productsModel.productsModel.findAll();
  return { type: null, message: products };
};

const getById = async (id) => {
  const error = validateId(id);
  if (error.type) return error;
  
  const products = await productsModel.productsModel.findById(id);
  
  if (!products || products.length === 0) {
    return { type: 'PRODUCT_NOT_FOUND', message: { message: 'Product not found' } };
  } 
  return { type: null, message: products[0] };
};

const createProduct = async (product) => {
  const error = validateName(product);

  if (error.type) return error;

  const newProduct = await productsModel.productsModel.insert(product);

  return { type: null, message: newProduct };
};

const deleteById = async (id) => {
  let error = validateId(id);
  if (error.type) return error;

  error = await validateProductExist(id);
  if (error.type) return error;

  await productsModel.productsModel.deleteById(id);

  return { type: null, message: { message: '' } };
};

const update = async (name, id) => {
  let error = validateName(name);
  if (error.type) return error;

  error = validateProductExist(id);
  if (error.type) return error;

  await productsModel.productsModel.update(name, id);
  
  const prod = await getById(id);
  return prod;
};

const findByQuery = async (q) => {
  const products = await productsModel.productsModel.findByQuery(q);
  if (q.length === 0) return getAll();
  
  return { type: null, message: [products] };
};

module.exports = { getAll, getById, createProduct, deleteById, update, findByQuery };