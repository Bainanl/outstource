<template>
    <div class="common-layout">
        <el-container>
            <el-header class="header flex-row justify-between items-center">
                <div class="flex-row items-center">
                    <img src="../assets/logo.png" alt="" class="logo">
                    <h1 class="title">商家后台管理系统</h1>
                </div>
                <el-button type="danger" @click="exit">退出</el-button>
            </el-header>
            <el-container>
                <el-aside width="200px" class="aside">
                    <el-menu class="el-menu-vertical-demo" background-color="none" text-color="white" :router="true">
                        <el-sub-menu index="1">
                            <template #title>
                                <el-icon>
                                    <Coin />
                                </el-icon>
                                <span>盲盒管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="classity">分类管理</el-menu-item>
                                <el-menu-item index="blindbox">盲盒管理</el-menu-item>
                                <el-menu-item index="store">商品管理</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <el-sub-menu index="2">
                            <template #title>
                                <el-icon>
                                    <MessageBox />
                                </el-icon>
                                <span>订单管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="deliveryed">已发货订单</el-menu-item>
                                <el-menu-item index="nodelivery">未发货订单</el-menu-item>
                            </el-menu-item-group>
                        </el-sub-menu>
                        <el-sub-menu index="3">
                            <template #title>
                                <el-icon>
                                    <User />
                                </el-icon>
                                <span>店铺管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="shop">店铺管理</el-menu-item>
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
            localStorage.clear();
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

.header {
    background-color: rgb(48, 55, 65);
}

.aside {
    background-color: rgb(48, 55, 65);
}

.logo {
    width: 80px;
}

.title {
    color: #fff;
}
</style>