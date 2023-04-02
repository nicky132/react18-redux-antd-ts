import request from "../utils/request";

/*
 * @Author: 寒云 <1355081829@qq.com>
 * @Date: 2022-05-22 21:52:52
 * @LastEditTime: 2022-08-14 21:56:41
 * @LastEditors: 最爱白菜吖
 * @Description:
 * @FilePath: \react-admin\src\api\admin.ts
 * @QQ: 大前端QQ交流群: 976961880
 * @QQ2: 大前端QQ交流群2: 777642000
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 最爱白菜吖, All Rights Reserved.
 */
export function getAdminListByPage(current: number = 1, pageSize: number = 15) {
	return request.get<any, IPagination<Admin>>("/admin/admin", {
		params: { current, pageSize },
	});
}
export function addAdmin(admin: Admin) {
	return request.post<any, ResponseSuccess>("/admin/admin", admin);
}
export function updateAdmin(id: number, admin: Admin) {
	return request.put<any, ResponseSuccess>(
		"/api/admin/admin/update/" + id,
		admin
	);
}
export function deleteAdminById(id: number) {
	return request.delete<any, ResponseSuccess>("/admin/admin/" + id);
}
export function getCurrent() {
	return request.get<
		any,
		ResponseSuccess<{ admin: Admin; permissionList: Permission[] }>
	>("/admin/admin/admin/current");
}
