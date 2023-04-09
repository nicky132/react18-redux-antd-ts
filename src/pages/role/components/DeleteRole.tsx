/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-07-23 17:38:03
 * @LastEditTime: 2022-07-23 17:40:58
 * @LastEditors: hhq
 * @FilePath: \react-admin\src\pages\role\components\DeleteRole.tsx
 */
import { Button, message, Popconfirm } from "antd";
import React from "react";
import { deleteRoleById } from "../../../api/role";
interface IProps {
	id: number;
	onDelete(): void;
}
function DeleteRole({ id, onDelete }: IProps) {
	function deleteRole() {
		deleteRoleById(id).then((res) => {
			if (res.success) {
				onDelete();
				message.success("删除成功");
			} else {
				message.error(res.errorMessage);
			}
		});
	}
	return (
		<Popconfirm title="删除角色" onConfirm={deleteRole}>
			<Button type="primary" danger>
				删除
			</Button>
		</Popconfirm>
	);
}

export default DeleteRole;
