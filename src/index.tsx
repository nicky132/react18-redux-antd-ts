/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-06-28 20:46:11
 * @LastEditTime: 2022-08-15 14:13:24
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \react-admin\src\index.tsx
 */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import zhCN from "antd/lib/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import { ConfigProvider } from "antd";
moment.locale("zh-cn");

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<ConfigProvider locale={zhCN}>
				<App />
			</ConfigProvider>
		</Provider>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
