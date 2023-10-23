<script setup>
import { get_user_cardAPI } from '@/apis/api.js'
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router'
const route = useRoute()
// 获取特定用户的所有油卡
const userAllcard = ref([])
const get_user_card = async () => {
    const res = await get_user_cardAPI({ id: route.params.id })
    userAllcard.value = res.list
    console.log(res);
}
onMounted(() => get_user_card())
</script>

<template>
    <!-- 面包屑 -->
    <div style="margin-bottom:10px">
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/userlists' }" replace>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户油卡列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <!-- 老师课程相关信息 -->
    <div class="page_content">


        <!-- 表格 -->
        <el-table :data="userAllcard">
            <el-table-column prop="name" label="持卡人" />
            <el-table-column prop="category_name" label="油卡名称">
            </el-table-column>
            <el-table-column prop="file" label="卡号">
            </el-table-column>
            <el-table-column prop="phone" label="手机号" />
        </el-table>
    </div>
</template>
<style></style>