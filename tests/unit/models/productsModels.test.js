const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models');
const connection = require('../../../src/models/connection');

const products = require('./mock/products.model.mock')

describe('Testes de unidade do model de produtos', function () {
  afterEach(sinon.restore)

  it('Recuperando a lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products])

    const result = await productsModel.findAll();
    expect(result).to.be.deep.equal(products)
  });

  it('Recuperando um produto a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([products.oneProduct]);

    const result = await productsModel.findById(1);
    expect(result).to.be.deep.equal(products.oneProduct)
  })

  it('Realizando uma operação INSERT com o model products', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const result = await productsModel.insert(products.oneProduct[0].name);
    expect(result).to.be.deep.equal(products.oneProduct[0])
  })
})
