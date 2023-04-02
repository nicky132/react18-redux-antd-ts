/*
 * @Author: 寒云 <1355081829@qq.com>
 * @Date: 2022-06-28 21:13:47
 * @LastEditTime: 2022-08-14 15:15:40
 * @LastEditors: 最爱白菜吖
 * @Description:
 * @FilePath: \react-admin\src\pages\login\index.tsx
 * @QQ: 大前端QQ交流群: 976961880
 * @QQ3: 大前端QQ交流群3: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 最爱白菜吖, All Rights Reserved.
 */
import { Button, Form, Input, message, Space } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { doLogin } from "../../api/login";
import "./login.scss";
function Index() {
	const navigate = useNavigate();
	function login(values: Login) {
		doLogin(values).then((res) => {
			if (res.success) {
				localStorage.setItem("token", res.data.token);
				navigate("/");
			} else {
				message.error(res.errorMessage);
			}
		});
	}
	return (
		<>
			<div id="login-container">
				<Form
					id="login-form"
					initialValues={{
						username: "最爱白菜吖",
						password: "123456",
					}}
					onFinish={login}
					labelCol={{ span: 5 }}
					wrapperCol={{ span: 16 }}
				>
					<Form.Item
						label="用户名"
						name={"username"}
						rules={[
							{
								min: 2,
								required: true,
								message: "用户名长度至少2位",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="密码"
						name={"password"}
						rules={[
							{
								min: 6,
								required: true,
								message: "用户名长度至少6位",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Space>
							<Button type="primary" htmlType="submit">
								登录
							</Button>
							<Button htmlType="reset">重置</Button>
						</Space>
					</Form.Item>
				</Form>
			</div>
		</>
	);
}

export default Index;
