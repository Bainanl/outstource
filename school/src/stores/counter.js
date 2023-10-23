import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/api.js'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';

export const useCounterStore = defineStore('counter', () => {
  // 登录模块
  // 用户信息
  const userInfo = ref({})
  const router = useRouter()
  // 登录
  const login = async (username, password) => {
    const res = await loginAPI({ username, password, type: 'admin' })
    if (res.code === 200) {
      userInfo.value = res.data
      ElMessage({ type: 'success', message: res.message })
      router.replace({ path: '/' })
    } else {
      ElMessage({ type: 'error', message: res.message })
    }


  }
  // 退出登录
  const logout = () => {
    userInfo.value = {}
  }

  return { userInfo, login, logout }
}, {
  persist: true,
})
