/*
 * @Author: 寒云 <1355081829@qq.com>
 * @Date: 2022-05-22 12:23:30
 * @LastEditTime: 2022-06-15 18:18:53
 * @LastEditors: 寒云
 * @Description:
 * @FilePath: \react-admin\src\pages\admin\components\EditAdmin.tsx
 * @QQ: 大前端QQ交流群: 976961880
 * @QQ2: 大前端QQ交流群2: 777642000
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 最爱白菜吖, All Rights Reserved.
 */
import { Form, Input, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { updateAdmin } from "../../../api/admin";
import { getAllRole } from "../../../api/role";
interface IProps {
	visible: boolean;
	admin: Admin;
	onCancel(refresh?: boolean): void;
}
function EditAdmin({ visible, onCancel, admin }: IProps) {
	const [roleList, setRoleList] = useState<Role[]>([]);
	const [form] = Form.useForm();
	function ok() {
		form.submit();
	}
	function cancel() {
		onCancel();
	}
	function onFinish(a: Admin) {
		updateAdmin(admin.id, a).then((res) => {
			if (res.success) {
				message.success("添加成功");
				onCancel(true);
			} else {
				message.error(res.errorMessage);
			}
		});
	}
	useEffect(() => {
		// getAllRole().then((res) => {
		// 	setRoleList(res.data);
		// });
		return () => {
			if (!visible) {
				form.resetFields();
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [visible]);
	return (
		<Modal
			title="添加管理员"
			maskClosable={false}
			forceRender
			visible={visible}
			onOk={ok}
			onCancel={cancel}
		>
			<Form
				initialValues={{
					...admin,
					password: "",
				}}
				labelCol={{ span: 5 }}
				wrapperCol={{ span: 16 }}
				form={form}
				onFinish={onFinish}
			>
				<Form.Item
					label="用户名"
					name={"name"}
					rules={[
						{
							type: "string",
							required: true,
							message: "用户名不可以为空",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="邮箱"
					name={"email"}
					rules={[
						{
							type: "email",
							required: true,
							message: "邮箱格式不合法",
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item label="手机号" name={"mobile"}>
					<Input />
				</Form.Item>
				<Form.Item
					label="密码"
					name={"password"}
					rules={[
						{
							validator(_, value: string) {
								console.log(value === "");

								if (value !== "" && value.length < 6) {
									return Promise.reject("密码长度至少6位");
								}
								return Promise.resolve("");
							},
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="角色"
					name={"roleId"}
					rules={[
						{
							type: "number",
							min: 1,
							required: true,
							message: "请选择角色",
						},
					]}
				>
					<Select>
						{roleList.map((r) => (
							<Select.Option key={r.id} value={r.id}>
								{r.name}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	);
}

export default EditAdmin;
