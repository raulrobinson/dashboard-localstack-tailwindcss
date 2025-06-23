module.exports = [
  {
    "/localstack": {
      "target": "http://localhost:4566",
      "secure": false,
      "changeOrigin": true,
      "pathRewrite": {
        "^/localstack": ""
      }
    }
  }
];
