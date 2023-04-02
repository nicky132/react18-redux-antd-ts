/*
 * @Author: 寒云 <1355081829@qq.com>
 * @Date: 2022-07-05 21:20:48
 * @LastEditTime: 2022-08-15 14:20:20
 * @LastEditors: 最爱白菜吖
 * @Description:
 * @FilePath: \react-admin\src\pages\user\index.tsx
 * @QQ: 大前端QQ交流群: 976961880
 * @QQ3: 大前端QQ交流群3: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 最爱白菜吖, All Rights Reserved.
 */
import { Button, Space, Table } from "antd";
import { ColumnsType, TablePaginationConfig } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import { getUserList } from "../../api/user";
import Auth from "../../components/Auth";
import AddUser from "./components/AddUser";
import DeleteUser from "./components/DeleteUser";
import EditUser from "./components/EditUser";

function Index() {
	const [list, setList] = useState<User[]>([]);
	const [currentUser, setCurrentUser] = useState<User>({} as User);
	const [isShowEditModal, setIsShowEditModal] = useState<boolean>(false);
	const [isShowAddModal, setIsShowAddModal] = useState(false);
	const [pagination, setPagination] = useState<TablePaginationConfig>({
		position: ["bottomCenter"],
		showSizeChanger: false,
	});
	useEffect(() => {
		getListByPage();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	function getListByPage(current: number = 1) {
		getUserList(current).then((res) => {
			setList(res.data.list);
			setPagination({
				...pagination,
				...res.data,
			});
		});
	}
	function deleteUser(id: number) {
		// setList(list.filter((u) => u.id !== id));
		getListByPage();
	}
	function cancelEditUser(refresh?: boolean) {
		if (refresh) {
			getListByPage();
		}
		setIsShowEditModal(false);
	}
	function cancelAddUser(refresh?: boolean) {
		if (refresh) {
			getListByPage();
		}
		setIsShowAddModal(false);
	}
	function change(p: TablePaginationConfig) {
		getListByPage(p.current);
	}
	const columns: ColumnsType<User> = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "姓名",
			dataIndex: "username",
			key: "username",
		},
		{
			title: "email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "管理",
			render(value, record, index) {
				return (
					<Space>
						<Auth permission="editUser">
							<Button
								type="primary"
								onClick={() => {
									setCurrentUser(record);
									setIsShowEditModal(true);
								}}
							>
								编辑
							</Button>
						</Auth>
						<DeleteUser id={record.id} onDelete={deleteUser} />
					</Space>
				);
			},
		},
	];
	return (
		<>
			<EditUser
				user={currentUser}
				visible={isShowEditModal}
				onCancel={cancelEditUser}
			/>
			<AddUser visible={isShowAddModal} onCancel={cancelAddUser} />
			<Auth permission="addUser">
				<Button
					type="primary"
					onClick={() => {
						setIsShowAddModal(true);
					}}
				>
					新增
				</Button>
			</Auth>
			<Table
				onChange={change}
				rowKey={"id"}
				pagination={pagination}
				dataSource={list}
				columns={columns}
			/>
			;
		</>
	);
}

export default Index;
