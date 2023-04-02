import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCurrent } from "../../api/admin";

/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-15 13:02:07
 * @LastEditTime: 2022-08-15 13:26:46
 * @LastEditors: 最爱白菜吖
 * @FilePath: \react-admin\src\store\reducer\adminReducer.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
export interface AdminState {
	loading: boolean;
	admin: Admin;
	permissionList: Permission[];
}
const initialState: AdminState = {
	loading: true,
	admin: { id: 0, name: "" },
	permissionList: [] as Permission[],
};
export const adminState = createSlice({
	name: "adminState",
	initialState,
	reducers: {
		doLogout(state: AdminState) {
			// 不可以这么写
			// state=initialState
			state.admin = initialState.admin;
			state.loading = initialState.loading;
			state.permissionList = initialState.permissionList;
		},
	},
	extraReducers(builder) {
		builder.addCase(
			getCurrentInfo.fulfilled,
			(
				state,
				action: PayloadAction<{
					admin: Admin;
					permissionList: Permission[];
				}>
			) => {
				state.loading = false;
				state.admin = action.payload.admin;
				state.permissionList = action.payload.permissionList;
			}
		);
	},
});
export const getCurrentInfo = createAsyncThunk<{
	admin: Admin;
	permissionList: Permission[];
}>("getCurrentInfo", async () => {
	const current = await getCurrent();
	return {
		...current.data,
	};
});
export const { doLogout } = adminState.actions;

export default adminState.reducer;
