const Boom = require('@hapi/boom');
const imageToBase64 = require('image-to-base64');
const { ProductRepo, ProductImageRepo } = require('../repo');

const RepoProduct = new ProductRepo();
const RepoProductImage = new ProductImageRepo();
const productService = {
  index: async (request, h) => {
    try {
      const page = +request.query.page || 1;
      const itemsPerPage = 12;
      const count = await RepoProduct.count();
      const totalPage = Math.ceil(count / itemsPerPage);
      const list = await RepoProduct.pagination(page, itemsPerPage);
      const products = await Promise.all(
        list.map(async product => {
          const images = await RepoProductImage.getByProductId(product.id);
          return { ...product, image: images[0] };
        })
      );
      return h.response({ page, totalPage, products });
    } catch (err) {
      return Boom.badImplementation(err);
    }
  },
  show: async (request, h) => {
    try {
      const { id } = request.params;
      const product = await RepoProduct.getByid(id);
      if (!product.length) return Boom.notFound('Product Not Found');
      const tempImages = await RepoProductImage.getByProductId(product[0].id);
      const images = await Promise.all(
        tempImages.map(async image => {
          const base64 = await imageToBase64(image.url);
          return { ...image, data_url: `data:image/png;base64,${base64}` };
        })
      );
      return h.response({ ...product[0], images });
    } catch (err) {
      return Boom.badImplementation(err);
    }
  },
  create: async (request, h) => {
    try {
      const { name, sku, price, description } = request.payload;
      const getSku = await RepoProduct.getBySku(sku);
      if (getSku.length) return Boom.conflict('SKU Already Exists');
      const createProduct = await RepoProduct.create({ name, sku, price, description, created_at: new Date() });
      return h.response(createProduct[0]).code(201);
    } catch (err) {
      console.log(err);
      return Boom.badImplementation(err);
    }
  },
  update: async (request, h) => {
    try {
      const { id } = request.params;
      const product = await RepoProduct.getByid(id);
      if (!product.length) return Boom.notFound('Product Not Found');
      const updateProduct = await RepoProduct.updateByid(id, request.payload);
      return h.response(updateProduct[0]);
    } catch (err) {
      return Boom.badImplementation(err);
    }
  },
  delete: async (request, h) => {
    try {
      const { id } = request.params;
      await RepoProduct.deleteById(id);
      return h.response({ message: 'Delete Product Successfully' });
    } catch (err) {
      return Boom.badImplementation(err);
    }
  },
};

module.exports = productService;
