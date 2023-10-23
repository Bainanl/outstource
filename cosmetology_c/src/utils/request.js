import api from './service'
// 获取分页
export const getColor = (params) => api.get('/xiaofu/getColor', { params })
// 上传颜色
export const addColor = (params) => api.get('/xiaofu/addColor', { params })
// 上传分享也图片
export const updateShare = (params) => api.get('/xiaofu/updateIndexPageImage', { params })
// 上传操作流程图片
export const updateflowpath = (params) => api.get('/xiaofu/updateControlPageImage', { params })
// 上传云色库轮播图
export const updateswiper = (params) => api.get('/xiaofu/turnSwiperImg', { params })