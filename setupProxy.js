const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://onepiecearcsapi3d2y-0729a9eea5cc.herokuapp.com',
      changeOrigin: true,
    })
  );
};
