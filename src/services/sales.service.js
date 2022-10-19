const models = require('../models');
const {
  validateId, validateSaleExist, validateSaleProduct,
} = require('./validations/validationsInputValues');

const getAll = async () => {
  const sales = await models.salesModel.getAll();
  return { type: null, message: sales };
};

const getById = async (id) => {
  const error = validateId(id);

  if (error.type) return error;

  const sales = await models.salesModel.getById(id);

  if (!sales || sales.length === 0) {
    return { type: 'SALE_NOT_FOUND', message: { message: 'Sale not found' } };
  }
  return { type: null, message: sales };
};

const deleteById = async (id) => {
  let error = validateId(id);
  if (error.type) return error;

  error = await validateSaleExist(id);
  if (error.type) return error;

  await models.salesModel.deleteById(id);

  return { type: null, message: { message: '' } };
};

const update = async (saleId, products) => {
  const { type } = await validateSaleExist(saleId);
  if (type) return { status: 404, message: 'Sale not found' };

  const error = await validateSaleProduct(products);
  if (error) return error;

  const prod = await models.salesModel.update(saleId, products);

  return { type: null, message: prod };
};

const insert = async (products) => {
  const error = await validateSaleProduct(products);
  if (error) return error;

  const id = await models.salesModel.insertProduct(products);

  return { type: null, message: { id, itemsSold: products } };
};

module.exports = { getAll, getById, deleteById, update, insert };