/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-06-28 21:32:08
 * @LastEditTime: 2022-06-28 21:33:32
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \react-admin\src\setupProxy.js
 */
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/admin",
    createProxyMiddleware({
      target: "http://localhost:3006",
      changeOrigin: true,
    })
  );
};
