import request from "../utils/request";

/*
 * @Author: 寒云 <1355081829@qq.com>
 * @Date: 2022-06-28 21:25:25
 * @LastEditTime: 2022-06-28 21:43:54
 * @LastEditors: 寒云
 * @Description:
 * @FilePath: \react-admin\src\api\login.ts
 * @QQ: 大前端QQ交流群: 976961880
 * @QQ3: 大前端QQ交流群3: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 最爱白菜吖, All Rights Reserved.
 */
export function doLogin(admin: Login) {
	return request.post<any, ResponseSuccess<{ token: string }>>(
		"/admin/admin/login",
		admin
	);
}
