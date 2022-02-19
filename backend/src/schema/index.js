const Joi = require('joi');
const option = {
  failAction(request, h, err) {
    err.output.statusCode = 422;
    err.output.payload.statusCode = 422;
    err.output.payload.error = 'Unprocessable Entity';
    return err;
  },
  options: {
    abortEarly: false,
  },
};

const productSchema = {
  validate: {
    payload: Joi.object({
      name: Joi.string().required().max(255),
      sku: Joi.string().required().max(255),
      price: Joi.number().integer().required(),
      description: Joi.string(),
    }),
    ...option,
  },
};

const productImagesSchema = {
  validate: {
    payload: Joi.object({
      images: Joi.binary().encoding('base64'),
    }),
    ...option,
  },
};

const shema = { productSchema, productImagesSchema };

module.exports = shema;
