const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = (app) => {
    app.use(createProxyMiddleware('/api/v1/sessions', {
        target: 'https://api.orderq.shop',
        //secure: false,
        changeOrigin: true,
        // pathRewrite: { '^/api2': '' }
    })
    );
}