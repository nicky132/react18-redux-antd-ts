/*
 * @Author: 寒云 <1355081829@qq.com>
 * @Date: 2022-05-23 17:27:28
 * @LastEditTime: 2022-08-15 14:19:00
 * @LastEditors: 最爱白菜吖
 * @Description:
 * @FilePath: \react-admin\src\components\Auth.tsx
 * @QQ: 大前端QQ交流群: 976961880
 * @QQ2: 大前端QQ交流群2: 777642000
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 最爱白菜吖, All Rights Reserved.
 */
import { Spin } from "antd";
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface IProps {
	permission: string;
	children?: ReactNode;
}
function Auth({ permission, children }: IProps) {
	const { loading, permissionList } = useSelector(
		(state: RootState) => state.adminReducer
	);
	if (loading) {
		return null;
	}
	let permissionSet = new Set(permissionList.map((p) => p.uniqueKey));
	if (!permissionSet.has(permission)) {
		return null;
	}
	return <>{children}</>;
}

export default Auth;
