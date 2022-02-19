const productRoute = require('./productRoute');
const productImageRoute = require('./productImageRoute');

const route = [
  ...productRoute,
  ...productImageRoute,
  {
    method: 'GET',
    path: '/public/{folder}/{filename*}',
    handler: {
      file: function (request) {
        const { folder, filename } = request.params;
        return `${folder}/${filename}`;
      },
    },
  },
];

module.exports = route;
