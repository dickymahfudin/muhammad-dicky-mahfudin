const { productImageService } = require('../app/service');

const productRoute = [
  { method: 'DELETE', path: '/product/image/{id}', handler: productImageService.delete },
  {
    method: 'POST',
    path: '/product/{productId}/image',
    options: {
      payload: {
        maxBytes: 1000 * 1000 * 2,
        parse: true,
        allow: 'multipart/form-data',
        multipart: { output: 'stream' },
      },
    },
    handler: productImageService.create,
  },
];

module.exports = productRoute;
