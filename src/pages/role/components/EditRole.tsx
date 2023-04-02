/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-08-06 13:00:15
 * @LastEditTime: 2022-08-15 11:22:35
 * @LastEditors: 最爱白菜吖
 * @FilePath: \react-admin\src\pages\role\components\EditRole.tsx
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
import { Form, Input, message, Modal, Tree } from "antd";
import React, { useEffect, useState } from "react";
import { getPermissionList, updateRole } from "../../../api/role";
interface IProps {
	visible: boolean;
	role: Role;
	onCancel(refresh?: boolean): void;
}
function EditRole({ visible, onCancel, role }: IProps) {
	const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
	const [treeData, setTreeData] = useState([]);
	const [form] = Form.useForm();
	const onCheck = (checkedKeysValue: any) => {
		setCheckedKeys(checkedKeysValue.checked);
		form.setFieldsValue({ permissionList: checkedKeysValue.checked });
	};

	useEffect(() => {
		function generateTree(permissionList: Permission[], parentId = 0): any {
			const tmp = [];
			for (let p of permissionList) {
				if (p.parentId === parentId) {
					tmp.push({
						title: p.name,
						key: p.id + "",
						children: generateTree(permissionList, p.id),
					});
				}
			}
			return tmp;
		}
		if (visible) {
			getPermissionList().then((res) => {
				const list = generateTree(res.data, 0);
				setTreeData(list);
				setCheckedKeys(role?.permissionList.map((p) => p.id + ""));
				form.setFieldsValue({
					permissionList: role?.permissionList.map((p) => p.id + ""),
					id: role.id,
					name: role.name,
				});
			});
		} else {
			form.resetFields();
			setCheckedKeys([]);
		}
	}, [visible, form, role]);
	function cancel() {
		onCancel();
	}
	function update(role: Role) {
		updateRole(role.id, role).then((res) => {
			if (res.success) {
				onCancel(true);
				message.success("添加成功");
			} else {
				message.error(res.errorMessage);
			}
		});
	}
	return (
		<>
			<Modal
				forceRender
				visible={visible}
				title="添加角色"
				onCancel={cancel}
				onOk={() => {
					form.submit();
				}}
			>
				<Form form={form} onFinish={update}>
					<Form.Item
						hidden
						label="角色名称"
						name={"id"}
						rules={[
							{
								type: "number",
								required: true,
								message: "角色id不可以为空",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="角色名称"
						name={"name"}
						rules={[
							{
								type: "string",
								required: true,
								message: "角色名称不可以为空",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="权限"
						name={"permissionList"}
						rules={[
							{
								type: "array",
								required: true,
								min: 1,
								message: "角色权限不可以为空",
							},
						]}
					>
						<Tree
							checkStrictly
							checkable
							treeData={treeData}
							onCheck={onCheck}
							checkedKeys={checkedKeys}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
}

export default EditRole;
