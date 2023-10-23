<script setup>
import { get_all_usersAPI } from '@/apis/api.js'
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()
// 获取所有用户
const userlist = ref([])
const get_all_users = async () => {
    const res = await get_all_usersAPI()
    userlist.value = res.list
}
onMounted(() => get_all_users())
// 搜索用户
let keyword = ref('')
const searchlist = computed(() => {
    return userlist.value.filter(item => item.name.indexOf(keyword.value) !== -1)
})
// 跳转详情
const details = (id) => {
    router.push(`/userdetails/${id}`)
}
</script>

<template>
    <!-- 面包屑 -->
    <div style="margin-bottom:10px">
        <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/userlists' }" replace>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <!-- 白色区域 -->
    <div class="page_content">
        <div class="flex">
            <div class="input_box">
                <el-input placeholder="请输入关键字" v-model="keyword">
                    <template #append>
                        <el-button><el-icon>
                                <Search />
                            </el-icon></el-button>
                    </template>
                </el-input>
            </div>
            <!-- <el-button type="primary" style="margin-left: 50px;" @click="dialogVisible_add = true">添加油卡</el-button> -->
            <!-- <el-button type="primary" style="margin-left: 50px;" @click="exportcommend">导出本周评价</el-button> -->
        </div>
        <!-- 表格 -->
        <el-table :data="searchlist">
            <el-table-column label="用户头像">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-image style="width: 100px; height: 100px" :src="scope.row.avatar" fit="cover" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="用户昵称" />
            <el-table-column prop="phone" label="用户手机号" />
            <el-table-column prop="phone" label="累计消费/元">
                <template #default="scope">
                    <div>
                        {{ (scope.row.total / 100).toFixed(2) }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" @click="details(scope.row.id)">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<style></style>