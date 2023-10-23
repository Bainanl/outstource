<template>
    <div class="common-layout">
        <el-container>
            <el-header class="common-header flex-float">
                <div class="flex">
                    <img class="logo" src="../assets/logo.png">
                    <h1 class="title">商家后台管理系统</h1>
                </div>
                <!-- <el-button type="danger">退出</el-button> -->
            </el-header>
            <el-container class="container_col">
                <el-aside width="200px">
                    <el-menu active-text-color="#ffd04b" background-color="rgb(48, 55, 65)" class="el-menu-vertical-demo"
                        default-active="2" text-color="#fff" :router="true">
                        <el-sub-menu index="1">
                            <template #title>
                                <!-- <el-icon>
                                    <location />
                                </el-icon> -->
                                <span>后台管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="color">后台管理</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <!-- <el-sub-menu index="2">
                            <template #title>
                                <el-icon>
                                    <location />
                                </el-icon>
                                <span>图片管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="picture">肤色技术页图片</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu> -->
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
export default {
    setup() {
        return {

        }
    }
}
</script>
<style lang="css">
body,
html {
    margin: 0;
    padding: 0;
}

.flex-float {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.flex {
    display: flex;
    align-items: center;
}

.flex-col {
    display: flex;
    flex-direction: column;
}

.items-center {
    display: flex;
    align-items: center;
}

.justify-center {
    display: flex;
    justify-content: center;
}

.page_content {
    display: block;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 30px;
}

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

.container_col {
    height: 100%;
    background-color: rgb(48, 55, 65);
}
</style>
  