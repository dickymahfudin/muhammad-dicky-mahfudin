const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { afterEach, beforeEach, describe, it } = (exports.lab = Lab.script());
const { init } = require('../src/server');
const { generateToken } = require('../src/utils/auth');
const token = generateToken();

const product = { name: 'Unit Test', sku: 'unittest', price: 10000000 };

describe('GET /', () => {
  let server;
  let productId;

  beforeEach(async () => {
    server = await init();
  });
  afterEach(async () => {
    await server.stop();
  });

  it('Missing Authentication', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/product?page=1',
    });
    expect(res.statusCode).to.equal(401);
  });

  it('Get List Product', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/product?page=1',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(res.statusCode).to.equal(200);
  });

  it('Create Product Without Images', async () => {
    const res = await server.inject({
      method: 'post',
      payload: product,
      url: '/product',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    productId = res.result.id;
    expect(res.statusCode).to.equal(201);
  });

  it('Create Duplicate SKU', async () => {
    const res = await server.inject({
      method: 'post',
      payload: product,
      url: '/product',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(res.statusCode).to.equal(409);
    expect(res.result.message).to.equal('SKU Already Exists');
  });

  it('Update Product', async () => {
    const description = 'Ini deskripsi Unit Testing';
    const res = await server.inject({
      method: 'put',
      payload: { ...product, description },
      url: `/product/${productId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(res.statusCode).to.equal(200);
    expect(res.result.description).to.equal(description);
  });

  it('Delete Product', async () => {
    const res = await server.inject({
      method: 'delete',
      url: `/product/${productId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(res.result.message).to.equal('Delete Product Successfully');
  });
});
