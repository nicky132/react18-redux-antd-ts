import request from "../utils/request";

/*
 * @Author: hhq <530595274@qq.com>
 * @Date: 2022-07-05 21:27:04
 * @LastEditTime: 2022-07-12 21:47:53
 * @LastEditors: hhq
 * @Description:
 * @FilePath: \react-admin\src\api\user.ts
 */
export function getUserList(current: number = 1, pageSize: number = 15) {
  return request.get<any, IPagination<User>>("/admin/user", {
    params: {
      current,
      pageSize,
    },
  });
}
export function deleteUserById(id: number) {
  return request.delete<any, ResponseSuccess>("/admin/user/" + id);
}
export function updateUser(id: number, user: User) {
  return request.patch<any, ResponseSuccess>("/admin/user/" + id, user);
}
export function doAddUser(user: User) {
  return request.post<any, ResponseSuccess>("/admin/user", user);
}
