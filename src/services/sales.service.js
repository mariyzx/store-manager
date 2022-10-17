const models = require('../models');
const { validateId, validateSaleExist } = require('./validations/validationsInputValues');

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

module.exports = { getAll, getById, deleteById };