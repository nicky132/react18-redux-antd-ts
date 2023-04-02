/*
 * @Author: 寒云 <1355081829@qq.com>
 * @Date: 2022-06-28 20:46:20
 * @LastEditTime: 2022-06-28 21:36:48
 * @LastEditors: 寒云
 * @Description:
 * @FilePath: \react-admin\src\react-app-env.d.ts
 * @QQ: 大前端QQ交流群: 976961880
 * @QQ3: 大前端QQ交流群3: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 最爱白菜吖, All Rights Reserved.
 */
/// <reference types="react-scripts" />
declare global {
	interface ResponseSuccess<T = {}> {
		success: boolean;
		errorMessage?: string;
		data: T;
	}
	interface IPagination<T> {
		success: boolean;
		errorMessage?: string;
		data: {
			list: T[];
			current: 1;
			pageSize: number;
			total: number;
			totalPage: number;
		};
	}
	interface Window {
		logout(): void;
	}
}
export {};
