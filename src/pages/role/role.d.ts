/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-06-15 18:17:16
 * @LastEditTime: 2022-08-06 13:04:37
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \react-admin\src\pages\role\role.d.ts
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
