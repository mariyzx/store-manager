const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const services = require('../../../src/services');
const controller = require('../../../src/controllers')
const sales = require('../models/mock/sales.mock');

describe('Testes de  unidade do controller de vendas', function () {
  afterEach(sinon.restore)

  it('Recuperando a lista de vendas', async function () {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(services.salesService, 'getAll')
      .resolves({ type: null, message: sales });

    await controller.salesController.getAll(req, res);

    expect(res.status).to.have.been.calledWith(200)
  })

  it('Recuperando uma venda a partir do seu id válido', async function () {
    const res = {};
    const req = { params: { id: 1 }, body: {} };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(services.salesService, 'getById')
      .resolves({ type: null, message: sales[0] });

    await controller.salesController.listById(req, res)

    expect(res.status).to.have.been.calledWith(200)
  })

  it('Recuperando uma venda a partir do seu id inválido', async function () {
    const res = {};
    const req = { params: { id: 'aaa' }, body: {} };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(services.salesService, 'getById')
      .resolves({ type: 'INVALID_VALUE', message: { message: '"id" must be a number' } });

    await controller.salesController.listById(req, res)

    expect(res.status).to.have.been.calledWith(404)
  })

  it('Deletando uma venda a partir do seu id válido', async function () {
    const res = {};
    const req = { params: { id: 1 }, body: {} };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(services.salesService, 'deleteById')
      .resolves({ type: null, message: { message: '' } });

    await controller.salesController.deleteById(req, res)

    expect(res.status).to.have.been.calledWith(204)
  });

  it('Deletando uma venda a partir do seu id inválido', async function () {
    const res = {};
    const req = { params: { id: 'aaa' }, body: {} };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon
      .stub(services.salesService, 'deleteById')
      .resolves({ type: 'INVALID_VALUE', message: { message: '"id" must be a number' } });

    await controller.salesController.deleteById(req, res)

    expect(res.status).to.have.been.calledWith(404)
  })
})
