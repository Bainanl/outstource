<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
const account = ref('')
const password = ref('')
const num = ref('')
const router = useRouter()
const login = () => {
    if (account.value == "admin" && password.value == "000000" && num.value == "xfge") {
        ElMessage({ type: 'success', message: '登录成功' })
        router.replace('/homepage')
    }
    else {
        ElMessage({ type: 'error', message: '登录失败' })
    }

}
</script>

<template>
    <div id="app">
        <div data-v-9707fb28="" class="login-container">
            <div data-v-9707fb28="" class="login_wrap">
                <div data-v-9707fb28="" class="login_img">
                    <div data-v-9707fb28="" class="h3">一站式智慧场馆服务平台</div>
                    <div data-v-9707fb28="" class="text">多服务端口，满足场馆多场景服务需求</div>
                </div>
                <div data-v-9707fb28="" class="form_wrap">
                    <h3 data-v-9707fb28="" class="title">登录一站式智慧场馆服务平台</h3>
                    <div data-v-9707fb28="" class="label">用户名</div>
                    <div data-v-9707fb28="" class="line">
                        <div data-v-9707fb28="" class="el-input">
                            <!----><input v-model="account" tabindex="1" type="text" autocomplete="off" placeholder="请输入账号"
                                class="el-input__inner">

                        </div>
                    </div>
                    <div data-v-9707fb28="" class="label">密码</div>
                    <div data-v-9707fb28="" class="line">
                        <div data-v-9707fb28="" class="el-input el-input--suffix">
                            <!----><input v-model="password" tabindex="1" type="password" autocomplete="off"
                                placeholder="请输入密码" class="el-input__inner">
                            <!----><span class="el-input__suffix"><span class="el-input__suffix-inner">
                                    <!---->
                                    <!---->
                                    <!---->
                                    <!---->
                                </span>
                                <!---->
                            </span>
                            <!---->
                            <!---->
                        </div>
                    </div>
                    <div data-v-9707fb28="" class="label">验证码</div>
                    <div data-v-9707fb28="" class="line">
                        <div data-v-9707fb28="" class="el-input">
                            <!----><input v-model="num" type="text" autocomplete="off" placeholder="请输入验证码"
                                class="el-input__inner">
                            <!---->
                            <!---->
                            <!---->
                            <!---->
                        </div><img data-v-9707fb28="" src="../assets/images/validateCode.jfif" alt="" class="code_image">
                    </div>
                    <div data-v-9707fb28="" class="line forget primaryColor"><label data-v-9707fb28="" class="el-checkbox">
                            <div>
                                <input type="checkbox" />
                                <span>记住密码</span>
                            </div>

                        </label></div><button data-v-9707fb28="" type="button"
                        class="el-button login_btn el-button--primary" @click="login">
                        <!---->
                        <!----><span>立即登录</span>

                    </button>
                    <!-- <router-link to="/venuelist">Go to About</router-link> -->
                    <div data-v-9707fb28="" class="google"><img data-v-9707fb28=""
                            src="data:image/png;base64,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"
                            alt="" class="img"><span data-v-9707fb28="" class="placeholder6">本系统推荐使用GOOGLE浏览器</span>
                    </div>
                </div>
            </div>
            <div data-v-9707fb28="" class="login_bottom">
                <div data-v-9707fb28="">—— <span data-v-9707fb28=""></span>一站式智慧场馆服务平台 ——</div>
                <!-- <div data-v-9707fb28="" class="copyright">Copyright © 2022 - 2023 <span data-v-9707fb28=""></span>
                    All Rights Reserved. 版权所有</div> -->
            </div>
        </div>
    </div>
</template>

<style scoped>
.login-container .login_wrap .login_img[data-v-9707fb28] {
    width: 500px;
    height: 600px;
    background: url(../assets/images/login.png);
    background-size: 100% 100%;
    padding-left: 40px;
    padding-top: 80px;
}
</style>
