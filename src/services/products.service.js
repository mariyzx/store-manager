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
    return { type: 'PRODUCT_NOT_FOUND', response: { message: 'Product not found' } };
  } 
    return { type: null, response: products[0] };
};

const createProduct = async (product) => {
  const error = validateName(product);

  if (error.type) return error;

  const newProduct = await productsModel.productsModel.insert(product);

  return { type: null, response: newProduct };
};

const deleteById = async (id) => {
  let error = validateId(id);
  if (error.type) return error;

  error = await validateProductExist(id);
  if (error.type) return error;

  await productsModel.productsModel.deleteById(id);

  return { type: null, response: { message: '' } };
};

module.exports = { getAll, getById, createProduct, deleteById };