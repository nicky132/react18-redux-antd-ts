/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-07-05 21:43:44
 * @LastEditTime: 2022-07-05 21:55:59
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \react-admin\src\pages\user\components\DeleteUser.tsx
 */
import { Button, message, Popconfirm } from "antd";
import React from "react";
import { deleteUserById } from "../../../api/user";
interface Props {
	id: number;
	onDelete(id: number): void;
}
function DeleteUser({ id, onDelete }: Props) {
	function deleteUser() {
		// console.log(id);
		// 发送网络请求
		deleteUserById(id).then((res) => {
			if (res.success) {
				onDelete(id);
				message.success("删除成功");
			} else {
				message.error(res.errorMessage);
			}
		});
	}
	function cancel() {
		message.info("取消删除");
	}
	return (
		<>
			<Popconfirm
				title="删除用户"
				onCancel={cancel}
				onConfirm={deleteUser}
			>
				<Button type="primary" danger>
					删除
				</Button>
			</Popconfirm>
		</>
	);
}

export default DeleteUser;
