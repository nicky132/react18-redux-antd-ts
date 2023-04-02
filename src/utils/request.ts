/*
 * @Author: 寒云 <1355081829@qq.com>
 * @Date: 2022-06-28 21:03:39
 * @LastEditTime: 2022-08-15 13:18:00
 * @LastEditors: 最爱白菜吖
 * @Description:
 * @FilePath: \react-admin\src\utils\request.ts
 * @QQ: 大前端QQ交流群: 976961880
 * @QQ3: 大前端QQ交流群3: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 最爱白菜吖, All Rights Reserved.
 */
import { message } from "antd";
import axios from "axios";
const request = axios.create({
	timeout: 5000,
});
request.interceptors.request.use((c) => {
	const token = localStorage.getItem("token");
	if (token) {
		c.headers = {
			...c.headers,
			authorization: `Bearer ${token}`,
		};
	}
	return c;
});
request.interceptors.response.use(
	(res) => {
		return res.data;
	},
	(e) => {
		if (e.response.status === 401) {
			window.logout();
		}
		message.error(e.message);
		return Promise.reject(e);
	}
);
export default request;
