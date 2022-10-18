const { productsModel, salesModel } = require('../../models');
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
    message: { message: '"name" length must be at least 5 characters long' },
  }; 
}
  
  return { type: null, message: '' };
};

const validateProductExist = async (id) => {
  const product = await productsModel.findById(id);
  if (!product || product.length === 0) {
    return { type: 'PRODUCT_NOT_FOUND', message: { message: 'Product not found' } };
  }

  return { type: null, message: '' };
};

const validateSaleExist = async (id) => {
  const sale = await salesModel.getById(id);

  if (!sale || sale.length === 0) {
    return { type: 'SALE_NOT_FOUND', message: { message: 'Sale not found' } };
  }

  return { type: null, message: '' };
};

const keyExist = (products) => {
  for (let i = 0; i < products.length; i += 1) {
    if (!('productId' in products[i])) {
      return { status: 400, message: '"productId" is required' };
    } if (!('quantity' in products[i])) {
      return { status: 400, message: '"quantity" is required' };
    }
  }
};

const quantValid = (products) => {
  for (let i = 0; i < products.length; i += 1) {
    if (products[i].quantity <= 0) {
      return { status: 422, message: '"quantity" must be greater than or equal to 1' };
    }
  } 
};

const prodExist = async (products) => {
  const productsId = products.map((prod) => prod.productId);
  const result = productsId.map(async (prod) => {
    const a = await validateProductExist(prod);
    if (a.type) return a;
  });
  const treated = await Promise.all(result); // tem undefined
  const valid = treated.map((a) => a !== undefined); // tem false
  const n = valid.map((b) => b !== false);
  for (let i = 0; i < n.length; i += 1) {
    if (n[i]) {
      return { status: 404, message: 'Product not found' };
    }
  }
};

const validateSaleProduct = async (products) => {
  if (keyExist(products)) {
    return keyExist(products);
  }
  if (quantValid(products)) {
    return quantValid(products);
  }
  if (prodExist(products)) {
    const a = await prodExist(products);
    return a;
  }
};

module.exports = {
  validateId, validateName, validateProductExist, validateSaleExist, validateSaleProduct,
};