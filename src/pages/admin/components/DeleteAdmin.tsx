/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-05-22 22:39:12
 * @LastEditTime: 2022-06-15 18:18:39
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \react-admin\src\pages\admin\components\DeleteAdmin.tsx
 */
import { Button, message, Popconfirm } from "antd";
import React from "react";
import { deleteAdminById } from "../../../api/admin";
interface IProps {
	id: number;
	onDelete(id: number): void;
}
function DeleteAdmin({ id, onDelete }: IProps) {
	function deleteAdmin() {
		deleteAdminById(id).then((res) => {
			if (res.success) {
				onDelete(id);
				message.success("删除成功");
			} else {
				message.error(res.errorMessage);
			}
		});
	}
	return (
		<Popconfirm title="删除管理员" onConfirm={deleteAdmin}>
			<Button type="primary" danger>
				删除
			</Button>
		</Popconfirm>
	);
}

export default DeleteAdmin;
