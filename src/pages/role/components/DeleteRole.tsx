/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-07-23 17:38:03
 * @LastEditTime: 2022-07-23 17:40:58
 * @LastEditors: 最爱白菜吖
 * @FilePath: \react-admin\src\pages\role\components\DeleteRole.tsx
 * @QQ: 大前端QQ交流群: 976961880
 * @QQ3: 大前端QQ交流群3: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
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
