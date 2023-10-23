<script setup>
import { get_all_ordersAPI, shipmentAPI, markorderAPI } from '@/apis/api.js'
import { onMounted, ref, computed } from 'vue';
import 'element-plus/es/components/message/style/css'
import { ElMessage, ElLoading } from 'element-plus'
// 获取全部订单
const Allorederlist = ref([])
const get_all_orders = async () => {
    const res = await get_all_ordersAPI({ page: 1, per_page: 10000, state: 5 })
    Allorederlist.value = res.list
}
onMounted(() => get_all_orders())
// 搜索
const keyword = ref('')
const searchlist = computed(() => {
    return Allorederlist.value.filter(item => {
        return item.name.indexOf(keyword.value) != -1 || item.card_name.indexOf(keyword.value) != -1||item.card_file.indexOf(keyword.value) != -1
    })
})
// 筛选
const filterHandler = (value, row, col) => {
    return row.state == value
}
// 多选
const selectlist = ref([])

const selectionchange = (selection) => {
    selectlist.value = selection
}
const shipping = () => {
    if (selectlist.value.length == 0) {
        ElMessage({ type: 'warning', message: '请选择发货订单' })
    } else {
        let list = selectlist.value.filter(item => item.state != 1)
        if (list.length == 0) {
            selectlist.value.forEach(async (item) => {
                await shipmentAPI({ id: item.id })
                ElMessage({ type: 'success', message: '已全部发货完成' })
                get_all_orders()
            })
        } else {
            ElMessage({ type: 'warning', message: '请选择未发货的订单' })
        }
    }

}
// 发货
const dialogVisible_del = ref(false)
const id_del = ref(null)
const getdeliverId = (id) => {
    dialogVisible_del.value = true
    id_del.value = id
}
const shipment = async () => {
    const res = await shipmentAPI({ id: id_del.value })
    ElMessage({ type: 'success', message: res.message })
    dialogVisible_del.value = false
    get_all_orders()
}
// 标记订单异常
const dialogVisible_mark = ref(false)
const id_mark = ref(null)
const markinput = ref('')
const markunusual = (id) => {
    dialogVisible_mark.value = true
    id_mark.value = id
}
const markorder = async () => {
    const res = await markorderAPI({ id: id_mark.value, remark: markinput.value })
    ElMessage({ type: 'success', message: res.message })
    dialogVisible_mark.value = false
    get_all_orders()
}
</script>
<template>
    <div class="flex" style="padding: 10px 0;">
        <div class="input_box">
            <el-input placeholder="请输入关键字" v-model="keyword">
                <template #append>
                    <el-button><el-icon>
                            <Search />
                        </el-icon></el-button>
                </template>
            </el-input>
        </div>
        <el-button type="primary" style="margin-left: 50px;" @click="shipping">一键发货</el-button>
    </div>
    <div>
        <el-table ref="tableRef" :data="searchlist" style="width: 100%" @selection-change="selectionchange">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="name" label="用户昵称" width="180" />
            <!-- <el-table-column prop="card_name" label="持卡人姓名" width="180" /> -->
            <el-table-column prop="card_category" label="油卡名称" width="180" />
            <el-table-column prop="card_file" label="油卡卡号" width="180" />
            <el-table-column prop="spu_name" label="充值面额/元" width="180">
                <template #default="scope"><span>{{ (scope.row.spu_name / 100).toFixed(2) }}</span></template>
            </el-table-column>
            <el-table-column prop="total_fee" label="实际支付/元" width="180">
                <template #default="scope"><span>{{ (scope.row.total_fee / 100).toFixed(2) }}</span></template>
            </el-table-column>
            <el-table-column prop="pay_time" label="付款时间" width="180" />
            <el-table-column prop="remark" label="备注" width="180" fixed="right" />
            <el-table-column prop="state" label="状态" width="180" fixed="right" :filter-method="filterHandler" :filters="[
                { text: '待发货', value: 1 },
                { text: '已完成', value: 2 },
                { text: '异常', value: 3 },

            ]">
                <template #default="scope">
                    <span v-if="scope.row.state == 1">
                        <el-button type="primary" link>待发货</el-button>
                    </span>
                    <span v-if="scope.row.state == 2">
                        <el-button type="success" link>已完成</el-button>
                    </span>
                    <span v-if="scope.row.state == 3">
                        <el-button type="danger" link>异常</el-button>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180" fixed="right">
                <template #default="scope">
                    <div class="flex">
                        <el-button type="primary" :disabled="scope.row.state != 1 ? true : false"
                            @click="getdeliverId(scope.row.id)">发货</el-button>
                        <el-button type="danger" @click="markunusual(scope.row.id)">标记异常</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!-- 发货 -->
        <el-dialog v-model="dialogVisible_del" title="发货" width="30%">
            <span>是否已为用户充值?</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible_del = false">取消</el-button>
                    <el-button type="primary" @click="shipment">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 标记订单异常 -->
        <el-dialog v-model="dialogVisible_mark" title="标记订单异常" width="30%">
            <el-form>
                <el-form-item label="异常内容">
                    <el-input v-model="markinput"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible_mark = false">取消</el-button>
                    <el-button type="primary" @click="markorder">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>