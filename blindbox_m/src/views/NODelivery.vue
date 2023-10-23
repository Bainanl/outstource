<template>
    <el-table :data="tableData" style="width: 100%;margin-top:20px">
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="add" label="地址" />
        <el-table-column prop="add_time" label="下单时间" />
        <el-table-column label="商品">
            <template #default="scope">
                <div>
                    <span style="margin-left: 10px" v-for="item in scope.row.list" :key="item.id">{{ item.name }},</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button type="danger" @click="delivery(scope.row.id)">发货</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination small background layout="prev, pager, next" class="mt-4" @current-change="pageup" :page-count="total" />
    <!-- 发货 -->
    <el-dialog v-model="uploadVisible" title="发货">
        <el-form :model="uploadform">
            <el-form-item label="物流单号">
                <el-input v-model="uploadform.name" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="uploadVisible = false">取消</el-button>
                <el-button type="primary" @click="submit">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script>
import { nodelivery, fahuo } from '../util/request'
import { reactive, toRefs, onMounted, computed } from 'vue';
import { ElMessage } from 'element-plus'
export default {
    setup() {
        const data = reactive({
            keyword: '',
            tableData: [],
            total: 0,
            current: 1,
            uploadform: {
                name: ''
            },
            thisid: '',
            uploadVisible: false
        })
        // 发货
        const submit = () => {
            fahuo({
                id: data.thisid,
                wuliu: data.uploadform.name
            }).then(res => {
                if (res.code == 1) {
                    data.uploadVisible = false
                    getInfo()
                    ElMessage({
                        type: 'success',
                        showClose: true,
                        message: '发货成功',
                        center: true,
                    })
                }
                else {
                    ElMessage({
                        type: 'error',
                        showClose: true,
                        message: '发货失败',
                        center: true,
                    })
                }
                data.uploadform.name = ''
            })
        }
        // 填写物流单号
        const delivery = (e) => {
            data.uploadVisible = true
            data.thisid = e
        }
        // 搜索
        const searchlist = computed(() => {
            return data.tableData.filter(item => {
                return item.name.indexOf(data.keyword) !== -1
            })
        })
        // 翻页
        const pageup = (e) => {
            nodelivery({
                page: e,
                per_page: 10
            }).then(res => {
                data.tableData = res.list
                data.total = res.pages
            })
        }
        // 获取未发货信息
        const getInfo = () => {
            nodelivery({
                page: 1,
                per_page: 10
            }).then(res => {
                data.tableData = res.list
                data.total = res.pages
            })
        }
        // 初始化
        onMounted(() => {
            getInfo()
        })
        return {
            ...toRefs(data), searchlist, pageup, getInfo, delivery, submit
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