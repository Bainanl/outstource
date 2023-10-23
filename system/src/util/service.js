import axios from 'axios'
import { ElLoading } from 'element-plus'
import { ElMessage } from 'element-plus'

let loading = null
const Service = axios.create({
    timeout: 8000,
    baseURL: "https://api4.yoobit.cn",
})
// 请求拦截器
Service.interceptors.request.use(config => {
     loading = ElLoading.service({
         lock: true,
         text: 'Loading',
         background: 'rgba(0, 0, 0, 0.7)',
     })
    return config
})
// 响应拦截器
Service.interceptors.response.use(response => {

    // loading.close()
    return response.data

}, error => {
    ElMessage({
        message: '服务器出错',
        type: 'error',
        duration: 2000
    })
})

// export const get = (config => {
//     return Service({
//         ...config,
//         method: get,
//         data: config.data,
//     })
// })
export default Service