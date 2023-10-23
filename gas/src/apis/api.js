import http from '@/utils/http.js'

// 登录
export const loginAPI = (data) => http.post('login', data)
// 获取所有种类
export const getcategoriesAPI = () => http.get('getcategories')
// 添加种类
export const addCategoriesAPI = (data) => http.post('addCategories', data)
// 删除种类
export const delCategoriesAPI = (data) => http.post('delCategories', data)
// 获取特定种类下的商品
export const getAllspuNewAPI = (params) => http.get('getAllspuNew', { params })
// 添加商品
export const addSpuAPI = (data) => http.post('addSpu', data)
// 删除商品
export const delSpuAPI = (data) => http.post('delSpu', data)
// 更新商品库存
export const turnNumAPI = (data) => http.post('turnNum', data)
// 获取全部用户
export const get_all_usersAPI = () => http.get('get_all_users')
// 获取全部用户的card
export const get_user_cardAPI = (params) => http.get('get_user_card', { params })
// 查看全部订单
export const get_all_ordersAPI = (params) => http.get('get_all_orders', { params })
// 管理员发货
export const shipmentAPI = (data) => http.post('admin_shipment', data)
// 管理员标记订单异常
export const markorderAPI = (data) => http.post('admin_remark_order', data)
// 上传图片
export const upLoadGetTokenAvatarAPI = (params) => http.get('upLoadGetTokenAvatar', { params })