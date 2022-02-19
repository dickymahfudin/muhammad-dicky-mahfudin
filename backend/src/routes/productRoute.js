const { productService } = require('../app/service');
const { productSchema } = require('../schema');

const productRoute = [
  { method: 'GET', path: '/product', handler: productService.index },
  { method: 'GET', path: '/product/{id}', handler: productService.show },
  { method: 'POST', path: '/product', handler: productService.create, options: { ...productSchema } },
  { method: 'PUT', path: '/product/{id}', handler: productService.update, options: { ...productSchema } },
  { method: 'DELETE', path: '/product/{id}', handler: productService.delete },
];

module.exports = productRoute;
