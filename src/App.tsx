/*
 * @Author: 寒云 <1355081829@qq.com>
 * @Date: 2022-06-28 20:46:11
 * @LastEditTime: 2022-08-14 14:43:51
 * @LastEditors: 最爱白菜吖
 * @Description:
 * @FilePath: \react-admin\src\App.tsx
 * @QQ: 大前端QQ交流群: 976961880
 * @QQ3: 大前端QQ交流群3: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 最爱白菜吖, All Rights Reserved.
 */
import { Spin } from "antd";
import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import "./App.css";
import router from "./router";
function App() {
	return (
		<>
			<Suspense fallback={<Spin />}>{useRoutes(router)}</Suspense>
		</>
	);
}

export default App;
