const models = require('../models');
const { validateId } = require('./validations/validationsInputValues');

const getAll = async () => {
  const sales = await models.salesModel.getAll();
  return { type: null, message: sales };
};

const getById = async (id) => {
  const error = validateId(id);

  if (error.type) return error;

  const sales = await models.salesModel.getById(id);

  if (!sales || sales.length === 0) {
    return { type: 'SALE_NOT_FOUND', response: { message: 'Sale not found' } };
  }
  return { type: null, response: sales };
};

module.exports = { getAll, getById };