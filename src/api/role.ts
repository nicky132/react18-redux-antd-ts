import request from "../utils/request";

/*
 * @Author: 寒云 <1355081829@qq.com>
 * @Date: 2022-05-22 13:56:28
 * @LastEditTime: 2022-08-06 13:16:32
 * @LastEditors: 最爱白菜吖
 * @Description:
 * @FilePath: \react-admin\src\api\role.ts
 * @QQ: 大前端QQ交流群: 976961880
 * @QQ2: 大前端QQ交流群2: 777642000
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 最爱白菜吖, All Rights Reserved.
 */
export function getRoleListByPage(current: number = 1, pageSize: number = 15) {
	return request.get<any, IPagination<Role>>("/admin/role", {
		params: { current, pageSize },
	});
}
export function deleteRoleById(id: number) {
	return request.delete<any, ResponseSuccess>("/admin/role/" + id);
}
export function addRole(role: Role) {
	return request.post<any, ResponseSuccess>("/admin/role", role);
}
export function updateRole(id: number, role: Role) {
	return request.patch<any, ResponseSuccess>("/admin/role/" + id, role);
}
export function getRoleDetail(id: number) {
	return request.get<
		any,
		ResponseSuccess<{
			permissionAll: Permission[];
			permissionList: Permission[];
		}>
	>("/api/admin/role/detail/" + id);
}
export function getAllRole() {
	return request.get<any, ResponseSuccess<Role[]>>("/api/admin/role/all");
}
export function getPermissionList() {
	return request.get<any, ResponseSuccess<Permission[]>>(
		"/admin/role/permission/list"
	);
}
