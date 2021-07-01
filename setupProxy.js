const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    const proxy = createProxyMiddleware({
        target: 'http://localhost:8080/api',
        changeOrigin: true
    })
    app.use('/questions/findForQuiz', proxy);
};