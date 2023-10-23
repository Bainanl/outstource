<template>
    <div class="common-layout">
        <el-container>
            <el-header class="common-header flex-float">
                <div class="flex">
                    <img class="logo" src="../assets/logo.png">
                    <h1 class="title">商家后台管理系统</h1>
                </div>
                <el-button type="danger" @click="exit">退出</el-button>
            </el-header>
            <el-container>
                <el-aside width="200px" class="common-aside">
                    <el-menu background-color="none" text-color="white" :router="true">
                        <el-sub-menu index="1">
                            <template #title>
                                <el-icon>
                                    <User />
                                </el-icon>
                                <span>商品管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="users">商品列表</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group>
                                <el-menu-item index="classify">分类列表</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <el-sub-menu index="2">
                            <template #title>
                                <el-icon>
                                    <Box />
                                </el-icon>
                                <span>兑换码管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="roles">兑换码列表</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group>
                                <el-menu-item index="vipmanage">会员管理</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <el-sub-menu index="3">
                            <template #title>
                                <el-icon>
                                    <Box />
                                </el-icon>
                                <span>系统管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="system">系统管理</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import router from '@/router';

export default {
    setup() {
        const exit = () => {
            console.log(111);
            router.push({
                path: '/login'
            })
        }
        return { exit }
    }
}

</script>
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