const productsModel = require('../models');
const { validateId } = require('./validations/validationsInputValues');

const getAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const getById = async (id) => {
  const error = validateId(id);
  if (error.type) return error;
  
  const products = await productsModel.findById(id);
  
  if (!products || products.length === 0) {
    return { type: 'PRODUCT_NOT_FOUND', response: { message: 'Product not found' } };
  } 
    return { type: null, response: products[0] };
};

module.exports = { getAll, getById };