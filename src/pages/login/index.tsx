/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-06-28 21:13:47
 * @LastEditTime: 2022-08-14 15:15:40
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \react-admin\src\pages\login\index.tsx
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
						username: "hhq",
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
