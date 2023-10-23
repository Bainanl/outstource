import api from './service'
// 登录
export const adminLogin = (params) => api.get('/box/adminLogin', { params })
// 获取所有分类
export const getAllsku = () => api.get('/box/adminGetAllTSKU')
// 添加分类
export const addsku = (params) => api.get('/box/adminAddTSKU', { params })
//删除项目
export const admindel = (params) => api.get('/box/adminDel', { params })
// 获取全部盲盒
export const getblind = (params) => api.get('/box/adminGetAllSku', { params })
// 添加盲盒
export const addblind = (params) => api.get('/box/adminAddSku', { params })
// 获取盲盒内信息
export const getinfo = (params) => api.get('/box/getBoxInfo', { params })
// 获取稀有程度名称
export const getlevel = () => api.get('/box/adminGetLevel')
// 添加盲盒内商品
export const addblindstore = (params) => api.get('/box/adminAddSpu', { params })
// 获取已发货订单
export const deliveryed = (params) => api.get('/box/adminGetHasSendOrder', { params })
// 获取未发货订单
export const nodelivery = (params) => api.get('/box/adminGetNotSendOrder', { params })
// 发货
export const fahuo = (params) => api.get('/box/adminSendOrder', { params })
// 更改admin
export const turnadmin = (params) => api.get('/box/turnAdminPassword', { params })