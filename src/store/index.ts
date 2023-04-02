import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./reducer/adminReducer";

/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-15 13:00:02
 * @LastEditTime: 2022-08-15 13:14:48
 * @LastEditors: 最爱白菜吖
 * @FilePath: \react-admin\src\store\index.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
const store = configureStore({
	reducer: {
		adminReducer: adminReducer,
	},
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
