const { expect } = require('chai');
const sinon = require('sinon');
const models = require('../../../src/models');
const connection = require('../../../src/models/connection');
const sales = require('./mock/sales.mock');

describe('Testes de unidade do model de sales', function () {
  afterEach(sinon.restore)

  it('Recuperando a lista de vendas', async function () {
    sinon.stub(connection, 'execute').resolves([sales]);

    const result = await models.salesModel.getAll();
    expect(result).to.be.deep.equal(sales)
  })

  it('Recuperando uma venda a partir de seu id', async function () {
    sinon.stub(connection, 'execute').resolves(sales);

    const result = await models.salesModel.getById(1);
    expect(result).to.be.deep.equal(sales[0])
  })
})