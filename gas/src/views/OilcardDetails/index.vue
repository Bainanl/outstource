<script setup>
import { getAllspuNewAPI, addSpuAPI, delSpuAPI, turnNumAPI } from '@/apis/api.js'
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
const route = useRoute()

// 获取特定油卡的库存信息
const ThisoilcardInfo = ref([])
const getAllspuNew = async () => {
    const res = await getAllspuNewAPI({ category_id: route.params.id })
    ThisoilcardInfo.value = res.list
}
onMounted(() => getAllspuNew())
// 添加油卡充值面额
let dialogVisible_add = ref(false)
let formdata = ref({
    Rechargeamount: null,
    price: null,
    num: null
})
const Rechargeamount = async () => {
    if (formdata.value.Rechargeamount == null || formdata.value.price == null || formdata.value.num == null) {
        ElMessage({ type: 'warning', message: '请选择完整' })
    }
    else {
        const res = await addSpuAPI({ category_id: route.params.id, name: formdata.value.Rechargeamount * 100, price: formdata.value.price * 100, num: formdata.value.num })
        getAllspuNew()
        ElMessage({ type: 'success', message: '添加成功' })
        dialogVisible_add.value = false
        formdata.value = {
            Rechargeamount: null,
            price: null,
            num: null
        }
    }
}
// 删除该面值
let dialogVisible_del = ref(false)
let id_del = ref(null)
const visable_del = (id) => {
    id_del.value = id
    dialogVisible_del.value = true
}
const omit = async () => {
    const res = await delSpuAPI({ id: id_del.value })
    getAllspuNew()
    ElMessage({ type: 'success', message: '删除成功' })
    dialogVisible_del.value = false
}
// 修改库存
let dialogVisible_bank = ref(false)
let id_bank = ref(null)
let banknum = ref(null)
const visable_bank = (id) => {
    id_bank.value = id
    dialogVisible_bank.value = true
    const res = ThisoilcardInfo.value.filter(item => item.id == id_bank.value)
    banknum.value = res[0].num
}
const modify = async () => {
    const res = await turnNumAPI({ id: id_bank.value, num: banknum.value })
    getAllspuNew()
    ElMessage({ type: 'success', message: '修改成功' })
    dialogVisible_bank.value = false
}
</script>

<template>
    <!-- 面包屑 -->
    <div style="margin-bottom:10px">
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }" replace>油卡管理</el-breadcrumb-item>
            <el-breadcrumb-item>油卡信息</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <!-- 油卡详情信息 -->
    <div class="page_content">

        <div class="flex">
            <div class="input_box">
            </div>
            <el-button type="primary" @click="dialogVisible_add = true">添加油卡充值面额</el-button>
        </div>
        <!-- 表格 -->
        <el-table :data="ThisoilcardInfo">
            <el-table-column label="充值面额">
                <template #default="scope">
                    <span>{{ scope.row.name / 100 }}</span>
                </template>
            </el-table-column>
            <el-table-column label="售价">
                <template #default="scope">
                    <span>{{ scope.row.price / 100 }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="num" label="库存" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" @click="visable_bank(scope.row.id)">修改库存</el-button>
                    <el-button type="danger" @click="visable_del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加油卡充值面额 -->
        <el-dialog v-model="dialogVisible_add" title="添加油卡充值面额" width="30%">
            <el-form :model="formdata">
                <el-form-item label="充值金额">
                    <el-input v-model="formdata.Rechargeamount" type="number" min="0" />
                </el-form-item>
                <el-form-item label="售价">
                    <el-input v-model="formdata.price" type="number" min="0" />
                </el-form-item>
                <el-form-item label="库存">
                    <el-input v-model="formdata.num" type="number" min="1" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible_add = false">取消</el-button>
                    <el-button type="primary" @click="Rechargeamount()">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 是否删除 -->
        <el-dialog v-model="dialogVisible_del" title="删除" width="30%">
            <span>是否要删除该油卡充值面额?</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible_del = false">取消</el-button>
                    <el-button type="primary" @click="omit()">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 修改库存 -->
        <el-dialog v-model="dialogVisible_bank" title="修改库存" width="30%">
            <el-form>
                <el-form-item label="库存数量">
                    <el-input-number v-model="banknum" :min="1" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible_bank = false">取消</el-button>
                    <el-button type="primary" @click="modify()">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<style></style>