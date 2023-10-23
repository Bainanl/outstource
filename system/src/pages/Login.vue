<template>
    <div class="login_wrap">
        <div class="form_wrap">
            <el-form ref="ruleFormRef" :model="loginData" class="demo-ruleForm" label-width="120px">
                <el-form-item label="密码" prop="password" :rules="[{
                    required: true,
                    message: '此项为必填项',
                    trigger: 'blur',
                }]">
                    <el-input type="password" v-model="loginData.password" />
                </el-form-item>
                <el-button type="primary" class="login_btn" @click="login">登录</el-button>
            </el-form>
        </div>
    </div>
</template>
<script>
import { reactive, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import { adminLogin } from '../util/request'
export default {
    setup() {
        const router = useRouter()
        let data = reactive({
            loginData: {

                password: ''
            }
        })
        const login = () => {
            console.log(2);

        }
        onMounted(() => {
        })
        return {
            ...toRefs(data), store, login,
        }
    },
}
</script>
<style scoped>
.login_wrap {
    width: 100%;
    height: 100vh;
    background-color: aqua;
    position: relative;
}

.form_wrap {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding-top: 50px;
    padding-bottom: 50px;
    padding-right: 60px;
}

.login_btn {
    display: block;
    margin: 20px auto;
}
</style>