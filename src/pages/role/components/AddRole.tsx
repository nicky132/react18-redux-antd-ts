/*
 * @Author: 最爱白菜吖 <1355081829@qq.com>
 * @Date: 2022-07-23 17:24:16
 * @LastEditTime: 2022-08-15 11:23:08
 * @LastEditors: 最爱白菜吖
 * @FilePath: \react-admin\src\pages\role\components\AddRole.tsx
 * @QQ: 大前端QQ交流群: 976961880
 * @QQ3: 大前端QQ交流群3: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
import { Form, Input, message, Modal, Tree } from "antd";
import React, { useEffect, useState } from "react";
import { addRole, getPermissionList } from "../../../api/role";
interface IProps {
	visible: boolean;
	onCancel(refresh?: boolean): void;
}
function AddRole({ visible, onCancel }: IProps) {
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
			setCheckedKeys([]);
			form.resetFields();
			getPermissionList().then((res) => {
				// console.log(res.data);
				const list = generateTree(res.data, 0);
				setTreeData(list);
			});
		}
	}, [visible, form]);
	function cancel() {
		onCancel();
	}
	function add(role: Role) {
		addRole(role).then((res) => {
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
				<Form form={form} onFinish={add}>
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
						// valuePropName="checkedKeys"
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

export default AddRole;
