const products = require('./products.json');
const { ProductRepo, ProductImageRepo } = require('../../app/repo');

console.log('> Seed run -> waiting');
products.forEach(async product => {
  try {
    const createProduct = await new ProductRepo().create({
      id: product.id,
      name: product.name,
      sku: product.sku,
      price: +product.price,
      description: product.description,
    });
    const product_id = createProduct[0].id;
    product.images.forEach(async (image, i) => {
      await new ProductImageRepo().create({ product_id, name: `image0${i + 1}`, url: image });
    });
  } catch (err) {
    console.log(err.message);
  }
});
