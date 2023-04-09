import request from "../utils/request";

/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-06-28 21:25:25
 * @LastEditTime: 2022-06-28 21:43:54
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \react-admin\src\api\login.ts
 */
export function doLogin(admin: Login) {
  return request.post<any, ResponseSuccess<{ token: string }>>(
    "/admin/admin/login",
    admin
  );
}
