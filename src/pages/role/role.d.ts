/*
 * @Author: 寒云 <1355081829@qq.com>
 * @Date: 2022-06-15 18:17:16
 * @LastEditTime: 2022-08-06 13:04:37
 * @LastEditors: 最爱白菜吖
 * @Description:
 * @FilePath: \react-admin\src\pages\role\role.d.ts
 * @QQ: 大前端QQ交流群: 976961880
 * @QQ3: 大前端QQ交流群3: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 最爱白菜吖, All Rights Reserved.
 */
declare interface Role {
	id: number;
	name: string;
	permissionList: Permission[];
}
declare interface Permission {
	id: number;
	key: string;
	name: string;
	parentId: number;
	path: string;
	children: Permission[];
}
