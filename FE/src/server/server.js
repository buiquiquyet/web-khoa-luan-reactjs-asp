// const express = require('express');
// const { createProxyMiddleware } = require('http-proxy-middleware');

// const app = express();
// const port = 3001; // Cổng của proxy server

// // Middleware để giải quyết vấn đề CORS
// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g., in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to the next layer of middleware
//   next();
// });

// // Proxy middleware
// app.use(
//   '/api',
//   createProxyMiddleware({
//     target: 'http://localhost:7225', // Cổng của server ASP.NET Core API
//     changeOrigin: true,
//     pathRewrite: {
//       '^/api': '', // Remove the '/api' prefix when forwarding the request
//     },
//     onProxyRes: (proxyRes, req, res) => {
//       // You may not need this line, especially if you've set CORS in ASP.NET Core
//       proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//     },
//   })
// );

// // Serve static files from the 'src' directory
// app.use(express.static('public'));



// app.listen(port, () => {
//   console.log(`Proxy server listening at http://localhost:${port}`);
// });
