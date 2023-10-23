<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>兑换码管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 白色区域 -->
        <div class="page_content">
            <div class="flex">
                <el-button type="primary" @click="cdkeyVisible = true">增加兑换码</el-button>
            </div>
        </div>
        <!-- table -->
        <div style="display:flex;">
            <el-table :data="tableData_1" style="width: 25%">
                <el-table-column prop="card" label="极速会员" />
            </el-table>
            <el-table :data="tableData_2" style="width: 25%">
                <el-table-column prop="card" label="黄金会员" />
            </el-table>
            <el-table :data="tableData_3" style="width: 25%">
                <el-table-column prop="card" label="白金会员" />
            </el-table>
            <el-table :data="tableData_4" style="width: 25%">
                <el-table-column prop="card" label="钻石会员" />
            </el-table>
        </div>
        <!-- 增加的兑换码 -->
        <el-dialog v-model="cdkeyVisible" title="增加兑换码">
            <el-form :model="cdkeyform">
                <el-form-item label="选择会员">
                    <el-select v-model="cdkeyform.vip_name" class="m-2" placeholder="Select">
                        <el-option v-for="item in viplist" :key="item.id" :value="item.name" @click="getvip_id(item.id)" />
                    </el-select>
                </el-form-item>
                <el-form-item label="增加数量">
                    <el-input v-model="cdkeyform.num" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cdkeyVisible = false">取消</el-button>
                    <el-button type="primary" @click="addcdkey">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import { reactive, toRefs, onMounted } from 'vue'
import { getCDKey, addCDKey } from '../util/request'
import { ElMessage } from 'element-plus'
export default {
    setup() {
        const data = reactive({
            tableData_1: [],
            tableData_2: [],
            tableData_3: [],
            tableData_4: [],
            cdkeyVisible: false,
            cdkeyform: {
                num: '',
                vip_name: '',
                vip_id: null
            },
            viplist: [{ id: 1, name: '极速会员' }, { id: 2, name: '黄金会员' }, { id: 3, name: '白金会员' }, { id: 4, name: '钻石会员' }]
        })
        const getcdkey_1 = () => {
            getCDKey({
                vip_mode: 1
            }).then(res => {
                data.tableData_1 = res.cdkey
            })
        }
        const getcdkey_2 = () => {
            getCDKey({
                vip_mode: 2
            }).then(res => {
                data.tableData_2 = res.cdkey
            })
        }
        const getcdkey_3 = () => {
            getCDKey({
                vip_mode: 3
            }).then(res => {
                data.tableData_3 = res.cdkey
            })
        }
        const getcdkey_4 = () => {
            getCDKey({
                vip_mode: 4
            }).then(res => {
                data.tableData_4 = res.cdkey
            })
        }
        //获取会员id
        const getvip_id = (e) => {
            data.cdkeyform.vip_id = e
            console.log(data.cdkeyform.vip_id);
        }
        // 增加会员cdkey
        const addcdkey = (e) => {
            addCDKey({
                mode: data.cdkeyform.vip_id,
                num: data.cdkeyform.num
            }).then(res => {
                getcdkey_1()
                getcdkey_2()
                getcdkey_3()
                getcdkey_4()
                ElMessage({
                    type: 'success',
                    showClose: true,
                    message: '添加成功',
                    center: true,
                })
                data.cdkeyVisible = false
            })
        }
        onMounted(() => {
            getcdkey_1()
            getcdkey_2()
            getcdkey_3()
            getcdkey_4()
        })
        return {
            ...toRefs(data), getcdkey_1, getcdkey_2, getcdkey_3, getcdkey_4, getvip_id, addcdkey
        }
    }
}
</script>