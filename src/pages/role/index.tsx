/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-07-23 17:21:10
 * @LastEditTime: 2022-08-06 13:40:17
 * @LastEditors: hhq
 * @FilePath: \react-admin\src\pages\role\index.tsx
 */
import { Button, Space, Table } from "antd";
import { ColumnType, TablePaginationConfig } from "antd/lib/table";
import React, { useEffect, useState } from "react";
import { getRoleListByPage } from "../../api/role";
import AddRole from "./components/AddRole";
import DeleteRole from "./components/DeleteRole";
import EditRole from "./components/EditRole";

function Index() {
	const [loading, setLoading] = useState(true);
	const [roleList, setRoleList] = useState<Role[]>([]);
	const [role, setRole] = useState({} as Role);
	const [pagination, setPagination] = useState<TablePaginationConfig>({
		position: ["bottomCenter"],
		showSizeChanger: false,
	});
	const [isShowAdd, setIsShowAdd] = useState(false);
	const [isShowEdit, setIsShowEdit] = useState(false);
	function getRoleList(page: number = 1) {
		getRoleListByPage(page).then((res) => {
			setRoleList(res.data.list);
			setPagination({
				...pagination,
				...res.data,
			});
			setLoading(false);
		});
	}
	useEffect(() => {
		getRoleList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	function deleteRole() {
		getRoleList();
	}
	const columns: ColumnType<Role>[] = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "名称",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "管理",
			dataIndex: "action",
			render(value, record, index) {
				return (
					<Space>
						<Button
							type="primary"
							onClick={() => {
								setRole(record);
								setIsShowEdit(true);
							}}
						>
							编辑
						</Button>
						<DeleteRole id={record.id} onDelete={deleteRole} />
					</Space>
				);
			},
		},
	];
	function change(pagination: TablePaginationConfig) {
		getRoleList(pagination.current);
	}
	function cancelAdd(refresh?: boolean) {
		if (refresh) {
			getRoleList();
		}
		setIsShowAdd(false);
	}
	function cancelEdit(refresh?: boolean) {
		if (refresh) {
			getRoleList(pagination.current);
		}
		setIsShowEdit(false);
	}
	return (
		<>
			<Button
				type="primary"
				onClick={() => {
					setIsShowAdd(true);
				}}
			>
				添加
			</Button>
			<AddRole visible={isShowAdd} onCancel={cancelAdd} />
			<EditRole role={role} visible={isShowEdit} onCancel={cancelEdit} />
			<Table
				onChange={change}
				loading={loading}
				pagination={pagination}
				rowKey={"id"}
				columns={columns}
				dataSource={roleList}
			/>
		</>
	);
}

export default Index;
