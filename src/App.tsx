/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-06-28 20:46:11
 * @LastEditTime: 2022-08-14 14:43:51
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \react-admin\src\App.tsx
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
