const { expect } = require('chai');
const sinon = require('sinon');
const productService = require('../../../src/services');
const productModel = require('../../../src/models');
const products = require('./mock/products.service.mock');

describe('Testes de unidade do service de produtos', function () {  
  afterEach(sinon.restore)

  it('Recuperando a lista de produtos', async function () {
    sinon.stub(productModel.productsModel, 'findAll').resolves(products);

    const result = await productService.productsService.getAll();
    expect(result.message).to.deep.equal(products)
  })

  it('Recuperando um produto a partir do seu id', async function () {
    sinon.stub(productModel.productsModel, 'findById').resolves(products.oneProduct);

    const result = await productService.productsService.getById(1)
    expect(result.type).to.equal(null)
  })

  it('Recuperando um produto que não existe a partir de seu id', async function () {
    sinon.stub(productModel.productsModel, 'findById').resolves(undefined);

    const result = await productService.productsService.getById(1);
    expect(result.type).to.equal('PRODUCT_NOT_FOUND')
  })

  it('Recuperando um produto com um id inválido', async function () {
    sinon.stub(productModel.productsModel, 'findById').resolves(undefined);

    const result = await productService.productsService.getById('a');
    expect(result.type).to.equal('INVALID_VALUE');
  });

  describe('Realizando uma operação INSERT', function () {
    it('Com valores inválidos', async function () {
      const result = await productService.productsService.createProduct('aa')

      expect(result.type).to.equal('INVALID_VALUE');
      expect(result.response.message).to.equal('"name" length must be at least 5 characters long')
    })

    it('Com valores válidos', async function () {
      const result = await productService.productsService.createProduct('ProductX');

      expect(result.type).to.equal(null);
    })
  })
})