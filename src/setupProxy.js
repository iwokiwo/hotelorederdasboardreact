const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = (app) => {
    app.use(createProxyMiddleware('/api/v1/sessions', {
        target: 'https://103.250.10.196:8090',
        changeOrigin: true,
        // pathRewrite: { '^/api2': '' }
    })
    );
}