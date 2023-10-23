import api from './service'

// 登录
export const adminLogin = (params) => api.get('adminLogin', { params })
// 获取所有商品
export const getAllStore = () => api.get('/adminGetAllSpu')
// 删除
export const delThisSpu = (params) => api.get('/delThisSpu', { params })
// 编辑
export const turnVisit = (params) => api.get('/turnVisit', { params })
// 获取所有Sku
export const getAllSku = () => api.get('/getAllSku')
// 上传商品
export const uploadStore = (params) => api.get('/addSpu', { params })
// 上传分类
export const addSku = (params) => api.get('/addSku', { params })
// 删除分类
export const delThisSku = (params) => api.get('/delThisSku', { params })
// 获取全部轮播图
export const getAllSwiper = (params) => api.get('/getAllSwiper', { params })
// 添加轮播图
export const addSwiper = (params) => api.get('/addSwiperImg', { params })
// 删除轮播图
export const delThisSwiperItem = (params) => api.get('/delThisSwiperItem', { params })
// 获取帮助中心文本
export const getHelpCenterValue = () => api.get('getHelpCenterValue')
// 帮助中心文本修改
export const setHelpCenterValue = (params) => api.get('/setHelpCenterValue', { params })
// 获取签到以及分享可以获得的积分
export const getSetCoinInfo = () => api.get('getSetCoinInfo')
// 更改签到/看视频后获取的积分
export const setFreeCoin = (params) => api.get('/setFreeCoin', { params })
// 更改分享后获取的积分
export const setShareCoin = (params) => api.get('/setShareCoin', { params })
// 修改登录密码 
export const turnAdminPassword = (params) => api.get('turnAdminPassword', { params })
// 获取某个等级20个cdKey
export const getCDKey = (params) => api.get('getCDKey', { params })
// 获取会员信息
export const getVip = (params) => api.get('getAllVipInfoDateAndRemain', { params })
// 增加会员CDkey
export const addCDKey = (params) => api.get('addCDKey', { params })
// 更改会员信息
export const turnVipInfoDateAndRemain = (params) => api.get('turnVipInfoDateAndRemain', { params })
// 获取激励视频开关
export const getADSwitch = () => api.get('getADSwitch')
// 更改激励视频开关
export const turnADSwitch = (params) => api.get('turnADSwitch', { params })