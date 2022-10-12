const { expect } = require('chai');
const sinon = require('sinon');
const productService = require('../../../src/services');
const productModel = require('../../../src/models');
const products = require('./mock/products.service.mock');

describe('Testes de unidade do service de produtos', function () {  
  afterEach(sinon.restore)

  it('Recuperando a lista de produtos', async function () {
    sinon.stub(productModel, 'findAll').resolves(products);

    const result = await productService.getAll();
    expect(result.message).to.deep.equal(products)
  })

  it('Recuperando um produto a partir do seu id', async function () {
    sinon.stub(productModel, 'findById').resolves(products.oneProduct);

    const result = await productService.getById(1)
    expect(result.type).to.equal(null)
  })

  it('Recuperando um produto que não existe a partir de seu id', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);

    const result = await productService.getById(1);
    expect(result.type).to.equal('PRODUCT_NOT_FOUND')
  })

  it('Recuperando um produto com um id inválido', async function () {
    sinon.stub(productModel, 'findById').resolves(undefined);

    const result = await productService.getById('a');
    expect(result.type).to.equal('INVALID_VALUE');
  })
})