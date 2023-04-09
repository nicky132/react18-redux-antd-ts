/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-07-12 21:01:26
 * @LastEditTime: 2022-07-12 21:36:10
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \react-admin\src\pages\user\components\EditUser.tsx
 */
import { Form, Input, message, Modal } from "antd";
import React, { useEffect } from "react";
import { updateUser } from "../../../api/user";
interface IProps {
	user: User;
	visible: boolean;
	onCancel(refresh?: boolean): void;
}
function EditUser({ user, visible, onCancel }: IProps) {
	const [form] = Form.useForm();
	useEffect(() => {
		if (visible) {
			form.resetFields();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [visible]);
	function saveUser(u: User) {
		if (u.password === "") {
			delete u.password;
		}
		updateUser(user.id, u).then((res) => {
			if (res.success) {
				message.success("更新成功");
				onCancel(true);
			} else {
				message.error(res.errorMessage);
			}
		});
	}
	return (
		<Modal
			forceRender
			title="编辑用户"
			visible={visible}
			onCancel={() => {
				onCancel();
			}}
			onOk={() => {
				form.submit();
			}}
		>
			<Form
				labelCol={{ span: 5 }}
				wrapperCol={{ span: 16 }}
				form={form}
				initialValues={{
					...user,
					password: "",
				}}
				onFinish={saveUser}
			>
				<Form.Item label="id" name={"id"} hidden>
					<Input />
				</Form.Item>
				<Form.Item label="用户名" name={"username"}>
					<Input />
				</Form.Item>
				<Form.Item label="邮箱" name={"email"}>
					<Input />
				</Form.Item>
				<Form.Item label="密码" name={"password"}>
					<Input />
				</Form.Item>
			</Form>
		</Modal>
	);
}

export default EditUser;
