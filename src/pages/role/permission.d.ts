/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-08-06 12:13:22
 * @LastEditTime: 2022-08-12 18:03:33
 * @LastEditors: hhq
 * @FilePath: \react-admin\src\pages\role\permission.d.ts
 * @QQ: 大前端QQ交流群: 473246571
 * @公众账号: 乐编码
 * 惑而不从师，其为惑也，终不解矣
 * Copyright (c) 2022 by 武汉跃码教育, All Rights Reserved.
 */
declare interface Permission {
  id: number;
  name: string;
  parentId: number;
  uniqueKey: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  parentId: number;
  children?: Permission[];
}
