/*
 * @Author: 寒云 <1355081829@qq.com>
 * @Date: 2022-05-20 14:17:52
 * @LastEditTime: 2022-06-17 16:47:56
 * @LastEditors: 寒云
 * @Description:
 * @FilePath: \react-admin\src\pages\admin\index.tsx
 * @QQ: 大前端QQ交流群: 976961880
 * @QQ2: 大前端QQ交流群2: 777642000
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 最爱白菜吖, All Rights Reserved.
 */
import { Button, Space, Table, TablePaginationConfig } from "antd";
import { ColumnType } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import { getAdminListByPage } from "../../api/admin";
import Auth from "../../components/Auth";
import AddAdmin from "./components/AddAdmin";
import DeleteAdmin from "./components/DeleteAdmin";
import EditAdmin from "./components/EditAdmin";

function Index() {
	const [loading, setLoading] = useState(true);
	const [adminList, setAdminList] = useState<Admin[]>([]);
	const [admin, setAdmin] = useState<Admin>({} as Admin);
	const [isShowAdd, setIsShowAdd] = useState(false);
	const [isShowEdit, setIsShowEdit] = useState(false);
	const [pagination, setPagination] = useState<TablePaginationConfig>({
		position: ["bottomCenter"],
		showSizeChanger: false,
	});
	useEffect(() => {
		getAdminList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	function getAdminList(page: number = 1) {
		setLoading(true);
		getAdminListByPage(page).then((res) => {
			setAdminList(res.data.list);
			setPagination({
				...pagination,
				...res.data,
			});
			setLoading(false);
		});
	}
	function deleteAdmin(id: number) {
		setAdminList(adminList.filter((a) => a.id !== id));
	}
	const columns: ColumnType<Admin>[] = [
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
			title: "邮箱",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "角色",
			render(value) {
				return <>{value.role ? value.role.name : ""}</>;
			},
			key: "role",
		},
		{
			title: "管理",
			dataIndex: "action",
			render(_, record) {
				return (
					<Space>
						<Auth permission="editAdmin">
							<Button
								type="primary"
								onClick={() => {
									setAdmin(record);
									setIsShowEdit(true);
								}}
							>
								编辑
							</Button>
						</Auth>
						<Auth permission="deleteAdmin">
							<DeleteAdmin
								onDelete={deleteAdmin}
								id={record.id}
							/>
						</Auth>
					</Space>
				);
			},
		},
	];
	function change(pagination: TablePaginationConfig) {
		getAdminList(pagination.current);
	}
	function cancelAdd(refresh?: boolean) {
		if (refresh) {
			getAdminList();
		}
		setIsShowAdd(false);
	}
	function cancelEdit(refresh?: boolean) {
		if (refresh) {
			getAdminList();
		}
		setIsShowEdit(false);
	}
	return (
		<>
			<Auth permission="adminAdd">
				<Button
					type="primary"
					onClick={() => {
						setIsShowAdd(true);
					}}
				>
					添加
				</Button>
				<AddAdmin visible={isShowAdd} onCancel={cancelAdd} />
			</Auth>
			<Auth permission="editAdmin">
				<EditAdmin
					admin={admin}
					visible={isShowEdit}
					onCancel={cancelEdit}
				/>
			</Auth>
			<Table
				loading={loading}
				onChange={change}
				pagination={pagination}
				rowKey={"id"}
				columns={columns}
				dataSource={adminList}
			/>
		</>
	);
}

export default Index;
