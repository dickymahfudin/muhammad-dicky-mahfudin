const Boom = require('@hapi/boom');
const fs = require('fs-extra');
const path = require('path');
const { ProductImageRepo, ProductRepo } = require('../repo');

const RepoProduct = new ProductRepo();
const RepoProductImage = new ProductImageRepo();
const productImageService = {
  createUpdate: async (request, h) => {
    try {
      const { images } = request.payload;
      const { productId } = request.params;
      const findProduct = await RepoProduct.getByid(productId);
      if (!findProduct.length) return Boom.notFound('Product Not Found');
      // const mimetype = images.hapi.headers['content-type'];
      // if (mimetype === 'image/jpg' || mimetype === 'image/jpeg' || mimetype === 'image/png') {
      //   const dir = fs.mkdirSync(path.join(path.resolve('./'), `public/upload/${productId}`), { recursive: true });
      //   images.pipe(fs.createWriteStream(`test.png`));
      //   return h.response(images);
      // }
      console.log(request.payload);
      return Boom.unsupportedMediaType();
      return 'ok';
    } catch (err) {
      return Boom.badImplementation();
    }
  },
};

module.exports = productImageService;
