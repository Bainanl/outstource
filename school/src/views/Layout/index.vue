<script setup>
import { onMounted, ref } from 'vue';
import { useCounterStore } from '@/stores/counter.js'
import { useRouter } from 'vue-router';
const router = useRouter()
const stroes = useCounterStore()
let dialogVisible = ref(false)
const exit = () => {
    stroes.logout()
    router.replace('/login')
}
onMounted(() => {

})
</script>
<template>
    <div class="common-layout">
        <el-container>
            <el-header class="common-header flex-float">
                <div class="flex">
                    <!-- <img class="logo" src="@/assets/images/vue.png"> -->
                    <h1 class="title">学校后台管理系统</h1>
                </div>
                <el-button type="danger" @click="dialogVisible = true">退出</el-button>
                <!-- 退出登录对话框 -->
                <el-dialog v-model="dialogVisible" title="退出登录" width="30%">
                    <span>是否要退出登录?</span>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogVisible = false">取消</el-button>
                            <el-button type="primary" @click="exit">
                                确认
                            </el-button>
                        </span>
                    </template>
                </el-dialog>
            </el-header>
            <el-container>
                <!-- <el-aside width="200px" class="common-aside">
                    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
                        default-active="2" text-color="#fff" router>
                        <el-menu-item index="/allteacher">
                          
                            <span>老师管理</span>
                        </el-menu-item>
                        <el-menu-item index="/allclass">
                          
                            <span>班级管理</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside> -->
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<style>
.el-container {
    height: 100vh;
    overflow: hidden;
}

.common-header {
    background-color: rgb(48, 55, 65);
}

.common-aside {
    background-color: rgb(48, 55, 65)
}

.logo {
    width: 80px;
}

.title {
    color: #fff;
}

.el-main {
    background-color: #efefef;
}
</style>