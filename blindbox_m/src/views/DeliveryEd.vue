<template>
    <el-table :data="tableData" style="width: 100%;margin-top:20px">
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="add" label="地址" />
        <el-table-column prop="add_time" label="下单时间" />
        <el-table-column prop="wuliu" label="物流单号" />
        <el-table-column label="商品">
            <template #default="scope">
                <div>
                    <span style="margin-left: 10px" v-for="item in scope.row.list" :key="item.id">{{ item.name }},</span>
                </div>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination small background layout="prev, pager, next" :page-count="total" class="mt-4"
        v-model:current-page="current" @current-change="pageup" />
</template>
<script>
import { deliveryed } from '../util/request'
import { reactive, toRefs, onMounted, computed } from 'vue';
import { ElMessage } from 'element-plus'
export default {
    setup() {
        const data = reactive({
            keyword: '',
            tableData: [],
            total: null,
            current: 1,
        })
        // 搜索
        const searchlist = computed(() => {
            return data.tableData.filter(item => {
                return item.name.indexOf(data.keyword) !== -1
            })
        })
        // 翻页
        const pageup = (e) => {
            deliveryed({
                page: e,
                per_page: 10
            }).then(res => {
                data.tableData = res.list
                data.total = res.pages
            })
        }
        // 获取已发货信息
        const getInfo = () => {
            deliveryed({
                page: 1,
                per_page: 10
            }).then(res => {
                console.log(res);
                data.tableData = res.list
                data.total = res.pages
            })
        }
        // 初始化
        onMounted(() => {
            getInfo()
        })
        return {
            ...toRefs(data), searchlist, pageup, getInfo
        }
    }
}
</script>
<style>
.input_box {
    width: 300px;
    margin-right: 15px;
}
</style>