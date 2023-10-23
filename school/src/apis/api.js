import http from '@/utils/http.js'

// 登录
export const loginAPI = (data) => http.post('/login', data)
// 获取所有老师
export const getAllTeacherAPI = (params) => http.get('getAllTeacher', { params })
// 删除老师
export const delTeacherAPI = (data) => http.post('delTeacher', data)
// 添加老师
export const addTeacherInfoAPI = (data) => http.post('addTeacherInfo', data)
// 获取特定老师的带课信息
export const getThisTeacherInfoAPI = (params) => http.get('getThisTeacherInfo', { params })
// 获取老师本周的评价信息
export const getAllTeacherToClassThisWeekAPI = (params) => http.get('getAllTeacherToClassThisWeek', { params })
// 获取所有班级信息
export const getAllCourseAPI = () => http.get('getAllCourse')
// 获取所有课程信息
export const getAllClassAPI = () => http.get('getAllClass')
// 添加老师课程信息
export const turnTeacherInfoAPI = (data) => http.post('turnTeacherInfo', data)
// 删除老师带课信息
export const delTeacherToClassAPI = (data) => http.post('delTeacherToClass', data)
// 导出本周评价
export const outfileAPI = () => http.get('outfile')