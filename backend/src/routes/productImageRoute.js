const { productImageService } = require('../app/service');
const { productImagesSchema } = require('../schema');

const productRoute = [
  {
    method: 'POST',
    path: '/product/{productId}/image',
    options: {
      payload: {
        maxBytes: 1000 * 1000 * 2,
        output: 'stream',
        parse: true,
        multipart: true,
        defaultContentType: 'text/plain',
      },
    },
    handler: productImageService.createUpdate,
  },
];

module.exports = productRoute;
