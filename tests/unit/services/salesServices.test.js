const { expect } = require('chai');
const sinon = require('sinon');
const services = require('../../../src/services');
const models = require('../../../src/models');

const sales = require('../models/mock/sales.mock');

describe('Testes de unidade do service de sales', function () {
  afterEach(sinon.restore);

  it('Recuperando a lista de vendas', async function () {
    sinon.stub(models.salesModel, 'getAll').resolves(sales)

    const result = await services.salesService.getAll();
    expect(result.message).to.be.deep.equal(sales)
  });

  it('Recuperando uma venda a partir de seu id', async function () {
    sinon.stub(models.salesModel, 'getById').resolves(sales);

    const result = await services.salesService.getById(1);
    expect(result.message).to.be.deep.equal(sales)
  })

  it('Recuperando uma venda que não existe a partir de seu id', async function () {
    sinon.stub(models.salesModel, 'getById').resolves(undefined);

    const result = await services.salesService.getById(49);
    expect(result.type).to.equal('SALE_NOT_FOUND')
  })

  describe('Realizando uma operação DELETE', function () {
    it('Deletando um produto a partir de seu id inválido', async function () {
      sinon.stub(models.salesModel, 'deleteById').resolves(sales[0]);

      const result = await services.salesService.deleteById('aaa')
      expect(result.type).to.equal('INVALID_VALUE')
    })
  })
})