const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const productsService = require('../../../src/services/products.service');
const productsController = require('../../../src/controllers')
const products = require('./mock/product.mock');

describe('Teste de unidade do controller de produtos', function () {
  afterEach(sinon.restore)

  it('Recuperando a lista de produtos', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'getAll')
      .resolves({ type: null, message: products });
    
    await productsController.productsController.listProducts(req, res)

    expect(res.status).to.have.been.calledWith(200)
  });

  it('Recuperando um produto a partir do seu id', async function () {
    const res = {};
    const req = { params: { id: 1 }, body: {} };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'getById')
      .resolves({ type: null, message: products.oneProduct });
    
    await productsController.productsController.listById(req, res);

    expect(res.status).to.have.been.calledWith(200)
  })

  it('Recuperando um produto a partir de um id inválido', async function () {
    const res = {};
    const req = { params: { id: 999 }, body: {} };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(productsService, 'getById')
      .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

    await productsController.productsController.listById(req, res);

    expect(res.status).to.have.been.calledWith(404)
  })

  describe('Realizando uma operação INSERT', function () {
    it('Com valores inválidos', async function () {
      const res = {}
      const req = { params: {}, body: { name: 'aa' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'createProduct')
        .resolves({ type: 'INVALID_VALUE', message: { message: '"name" must be at least 5 characters long' } });
      
      await productsController.productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(422)
    })

    it('Com valores válidos', async function () {
      const res = {}
      const req = { params: {}, body: { name: 'ProductX' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, 'createProduct')
        .resolves({ type: null, message: { message: { id: 6, name: 'ProdutoX' } } });

      await productsController.productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201)
    })
  })
})