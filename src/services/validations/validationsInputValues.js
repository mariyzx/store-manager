const { productsModel } = require('../../models');
const { idSchema, nameSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  return { type: null, message: '' };
};

const validateName = (name) => {
  const { error } = nameSchema.validate(name);
  if (error) {
 return {
    type: 'INVALID_VALUE',
   response: { message: '"name" length must be at least 5 characters long' },
  }; 
}
  
  return { type: null, message: '' };
};

const validateProductExist = async (id) => {
  const product = await productsModel.findById(id);

  if (!product || product.length === 0) {
    return { type: 'PRODUCT_NOT_FOUND', response: { message: 'Product not found' } };
  }

  return { type: null, message: '' };
};

module.exports = { validateId, validateName, validateProductExist };