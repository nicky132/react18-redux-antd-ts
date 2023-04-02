import { Spin } from "antd";
import { lazy, ReactNode, Suspense } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import {
	UserOutlined,
	LaptopOutlined,
	DashboardOutlined,
	GoldOutlined,
	LockOutlined,
} from "@ant-design/icons";
import Login from "../pages/login";
import AppLayout from "../components/AppLayout";
import Dashboard from "../pages/dashboard";
const User = lazy(() => import("../pages/user"));
const Admin = lazy(() => import("../pages/admin"));
const Role = lazy(() => import("../pages/role"));
/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-14 14:36:56
 * @LastEditTime: 2022-08-14 14:45:33
 * @LastEditors: 最爱白菜吖
 * @FilePath: \react-admin\src\router\index.tsx
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
export interface IRouter extends RouteObject {
	path: string;
	label?: string;
	hide?: boolean;
	icon?: ReactNode;
	children?: IRouter[];
}
function lazyLoad(children: ReactNode) {
	return <Suspense fallback={<Spin />}>{children}</Suspense>;
}
const router: IRouter[] = [
	{
		path: "/",
		label: "首页",
		hide: true,
		icon: <LaptopOutlined />,
		element: <Navigate to="/dashboard" replace={true} />,
	},
	{
		path: "/dashboard",
		label: "仪表盘",
		icon: <DashboardOutlined />,
		element: <AppLayout> {lazyLoad(<Dashboard />)}</AppLayout>,
	},
	{
		path: "/user",
		label: "用户管理",
		icon: <UserOutlined />,
		element: <AppLayout />,
		children: [
			{
				path: "/user/list",
				label: "用户列表",
				icon: <UserOutlined />,
				element: lazyLoad(<User />),
			},
		],
	},
	{
		path: "/admin",
		label: "管理员管理",
		icon: <LockOutlined />,
		element: <AppLayout />,
		children: [
			{
				path: "/admin/list",
				label: "管理员列表",
				icon: <UserOutlined />,
				element: lazyLoad(<Admin />),
			},
		],
	},
	{
		path: "/role",
		label: "角色管理",
		icon: <GoldOutlined />,
		element: <AppLayout />,
		children: [
			{
				path: "/role/list",
				label: "角色列表",
				icon: <UserOutlined />,
				element: lazyLoad(<Role />),
			},
		],
	},
	{
		path: "/login",
		element: <Login />,
	},
];
export default router;
