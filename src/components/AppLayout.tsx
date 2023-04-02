/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-14 14:21:04
 * @LastEditTime: 2022-08-15 14:16:30
 * @LastEditors: 最爱白菜吖
 * @FilePath: \react-admin\src\components\AppLayout.tsx
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
import {
	LaptopOutlined,
	NotificationOutlined,
	UserOutlined,
	DownOutlined,
} from "@ant-design/icons";
import {
	Alert,
	Breadcrumb,
	Button,
	Col,
	Dropdown,
	Layout,
	Menu,
	Row,
	Space,
	Spin,
} from "antd";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import React, { ReactNode, useEffect, useState } from "react";
import { MenuInfo } from "rc-menu/lib/interface";
import {
	matchRoutes,
	Outlet,
	useLocation,
	useNavigate,
} from "react-router-dom";
import router, { IRouter } from "../router";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { doLogout, getCurrentInfo } from "../store/reducer/adminReducer";
import menu from "antd/lib/menu";
const { Header, Content, Sider } = Layout;
const items1 = ["1", "2", "3"].map((key) => ({
	key,
	label: `nav ${key}`,
}));

const AppLayout = ({ children }: { children?: ReactNode }) => {
	const { loading, admin, permissionList } = useSelector(
		(state: RootState) => state.adminReducer
	);
	const dispatch: AppDispatch = useDispatch();
	const [defaultSelectedKeys, setdefaultSelectedKeys] = useState<string[]>(
		[]
	);
	const navigate = useNavigate();
	const location = useLocation();
	function getMenuList(routers: IRouter[]): ItemType[] {
		let permissionSet = new Set(permissionList.map((p) => p.uniqueKey));
		let t: ItemType[] = [];
		for (let r of routers) {
			if (r.hide) {
				continue;
			}
			if (!permissionSet.has(r.path)) {
				continue;
			}
			let tmp = {
				key: r.path,
				label: r.label,
				icon: r.icon,
			} as ItemType;
			if (r.children) {
				// @ts-ignore
				tmp.children = getMenuList(r.children);
			}
			t.push(tmp);
		}
		return t;
	}
	function checkToken() {
		const token = localStorage.getItem("token");
		if (!token && location.pathname !== "/login") {
			navigate("/login");
		}
	}
	useEffect(() => {
		checkToken();
		window.logout = () => {
			localStorage.clear();
			navigate("/login");
		};
		const token = localStorage.getItem("token");
		if (token) {
			dispatch(getCurrentInfo());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		checkToken();
		const routerList = matchRoutes(router, location.pathname);
		// 更新了state 视图会重新渲染
		if (routerList) {
			setdefaultSelectedKeys(routerList.map((r) => r.pathname));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.pathname]);
	function go2Page(info: MenuInfo) {
		navigate(info.key);
	}
	function logout() {
		localStorage.clear();
		dispatch(doLogout());
		navigate("/login");
	}
	const menu = (
		<Menu
			items={[
				{
					key: "1",
					label: (
						<Button
							type="text"
							onClick={() => {
								logout();
							}}
						>
							退出
						</Button>
					),
				},
			]}
		/>
	);
	if (loading) {
		return (
			<Spin tip="Loading...">
				<Alert
					message="武汉跃码教育"
					description="惑而不从师，其为惑也，终不解矣"
					type="info"
				/>
			</Spin>
		);
	}
	if (defaultSelectedKeys.length === 0) {
		return null;
	}
	return (
		<Layout>
			<Header className="header">
				<Row>
					<Col span={22}>
						<Menu
							theme="dark"
							mode="horizontal"
							defaultSelectedKeys={["2"]}
							items={items1}
						/>
					</Col>
					<Col span={2}>
						<Dropdown overlay={menu}>
							<Space style={{ color: "white" }}>
								{admin.name}
								<DownOutlined />
							</Space>
						</Dropdown>
					</Col>
				</Row>
			</Header>
			<Layout>
				<Sider width={200} className="site-layout-background">
					<Menu
						onClick={go2Page}
						mode="inline"
						defaultSelectedKeys={defaultSelectedKeys}
						defaultOpenKeys={defaultSelectedKeys}
						style={{
							height: "100%",
							borderRight: 0,
						}}
						items={getMenuList(router)}
					/>
				</Sider>
				<Layout
					style={{
						padding: "0 24px 24px",
					}}
				>
					<Breadcrumb
						style={{
							margin: "16px 0",
						}}
					>
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>List</Breadcrumb.Item>
						<Breadcrumb.Item>App</Breadcrumb.Item>
					</Breadcrumb>
					<Content
						className="site-layout-background"
						style={{
							padding: 24,
							margin: 0,
							minHeight: 280,
						}}
					>
						{children}
						<Outlet />
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default AppLayout;
