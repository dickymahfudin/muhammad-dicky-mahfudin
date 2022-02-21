const Boom = require('@hapi/boom');
const fs = require('fs-extra');
const path = require('path');
const { ProductImageRepo, ProductRepo } = require('../repo');

const RepoProduct = new ProductRepo();
const RepoProductImage = new ProductImageRepo();

const productImageService = {
  create: async (request, h) => {
    try {
      const { image } = request.payload;
      const { productId } = request.params;
      const findProduct = await RepoProduct.getByid(productId);
      if (!findProduct.length) return Boom.notFound('Product Not Found');
      const mimetype = image.hapi.headers['content-type'];
      if (mimetype === 'image/jpg' || mimetype === 'image/jpeg' || mimetype === 'image/png') {
        const pathPublic = path.join(path.resolve('./'), 'public');
        const pathProduct = `${pathPublic}/${productId}`;
        if (!fs.existsSync(pathProduct)) {
          fs.mkdirSync(path.join(path.resolve('./'), `public/${productId}`), { recursive: true });
        }
        const filename = `${Date.now()}.${mimetype.split('/')[1]}`;
        const fileDir = `public/${productId}/${filename}`;
        image.pipe(fs.createWriteStream(`${pathProduct}/${filename}`));
        const createImage = await RepoProductImage.create({
          product_id: +productId,
          url: `http://localhost:${process.env.APP_PORT}/${fileDir}`,
        });
        return h.response(createImage[0]).code(201);
      }
      return Boom.unsupportedMediaType();
    } catch (err) {
      return Boom.badImplementation();
    }
  },

  delete: async (request, h) => {
    try {
      const { id } = request.params;
      await RepoProductImage.deleteById(id);
      return h.response({ message: 'Delete Image Successfully' });
    } catch (err) {
      return Boom.badImplementation(err);
    }
  },
};

module.exports = productImageService;
