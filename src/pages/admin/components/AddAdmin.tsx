/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-05-22 21:57:19
 * @LastEditTime: 2022-06-17 15:28:04
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \react-admin\src\pages\admin\components\AddAdmin.tsx
 */
import { Form, Input, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { addAdmin } from "../../../api/admin";
import { getRoleListByPage } from "../../../api/role";
interface IProps {
	visible: boolean;
	onCancel(refresh?: boolean): void;
}
function AddAdmin({ visible, onCancel }: IProps) {
	const [roleList, setRoleList] = useState<Role[]>([]);
	const [form] = Form.useForm();
	function ok() {
		form.submit();
	}
	function cancel() {
		onCancel();
	}
	function onFinish(admin: Admin) {
		addAdmin(admin).then((res) => {
			if (res.success) {
				message.success("添加成功");
				onCancel(true);
			} else {
				message.error(res.errorMessage);
			}
		});
	}
	useEffect(() => {
		getRoleListByPage().then((res) => {
			setRoleList(res.data.list);
		});
	}, []);
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
				labelCol={{ span: 5 }}
				wrapperCol={{ span: 16 }}
				form={form}
				onFinish={onFinish}
			>
				<Form.Item
					label="用户名"
					name={"username"}
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
							type: "string",
							min: 6,
							required: true,
							message: "密码长度至少6位",
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

export default AddAdmin;
