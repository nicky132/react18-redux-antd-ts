/*
 * @Author: 寒云 <1355081829@qq.com>
 * @Date: 2022-06-28 21:32:08
 * @LastEditTime: 2022-06-28 21:33:32
 * @LastEditors: 寒云
 * @Description:
 * @FilePath: \react-admin\src\setupProxy.js
 * @QQ: 大前端QQ交流群: 976961880
 * @QQ3: 大前端QQ交流群3: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 最爱白菜吖, All Rights Reserved.
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
