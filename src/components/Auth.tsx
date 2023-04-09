/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-05-23 17:27:28
 * @LastEditTime: 2022-08-15 14:19:00
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \react-admin\src\components\Auth.tsx
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
