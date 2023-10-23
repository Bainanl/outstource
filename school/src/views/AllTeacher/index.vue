<script setup>
import { getAllTeacherAPI, getThisTeacherInfoAPI, delTeacherAPI, addTeacherInfoAPI, outfileAPI } from '@/apis/api.js'
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
const router = useRouter()
// 所有教师信息
const AllTeacherInfo = ref([])
const getAllTeacher = async () => {
    const res = await getAllTeacherAPI()
    AllTeacherInfo.value = res.list
}
// 搜索
let keyword = ref('')
const searchlist = computed(() => {
    return AllTeacherInfo.value?.filter(item => {
        return item.name.indexOf(keyword.value) !== -1
    })
})
// 获取老师本周点评数据
const getThisTeacherInfo = async () => {
    const res = await getThisTeacherInfoAPI({ id: 2 })

}
// 跳转到详情页面
const details = (id) => {
    router.push(`/details/${id}`)
}
// 删除老师
let id_del = ref(null)
let dialogVisible_del = ref(false)
const visible_del = (id) => {
    dialogVisible_del.value = true
    id_del.value = id
}
const omit = async () => {
    const res = await delTeacherAPI({ id: id_del.value })
    getAllTeacher()
    dialogVisible_del.value = false
    ElMessage({ type: 'success', message: '删除成功' })
}
// 添加老师
let dialogVisible_add = ref(false)
let teacherName = ref('')
const addteacher = async () => {
    if (teacherName.value == '') {
        ElMessage({ type: 'warning', message: '请输入老师姓名' })
    }
    else {
        const res = await addTeacherInfoAPI({ name: teacherName.value, course: '' })
        ElMessage({ type: 'success', message: '添加成功' })
        dialogVisible_add.value = false
    }
}
// 导出评价
const exportcommend = async () => {
    const res = await outfileAPI()
    window.open(res.url, "_blank")
}
onMounted(() => {
    getAllTeacher()
    getThisTeacherInfo()
})
</script>

<template>
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
            <el-button type="primary" style="margin-left: 50px;" @click="dialogVisible_add = true">添加老师</el-button>
            <el-button type="primary" style="margin-left: 50px;" @click="exportcommend">导出本周评价</el-button>
        </div>
        <!-- 表格 -->
        <el-table :data="searchlist">
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="num" label="评教次数" />
            <el-table-column prop="has_this_week" label="本周是否提交" />
            <el-table-column prop="last_date" label="上次提交时间" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" @click="details(scope.row.id)">查看详情</el-button>
                    <el-button type="danger" @click="visible_del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 是否删除 -->
        <el-dialog v-model="dialogVisible_del" title="删除录" width="30%">
            <span>是否要删除该老师?</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible_del = false">取消</el-button>
                    <el-button type="primary" @click="omit()">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 添加老师 -->
        <el-dialog v-model="dialogVisible_add" title="添加老师" width="30%">
            <el-form>
                <el-form-item label="老师的姓名">
                    <el-input v-model="teacherName" />
                </el-form-item>
            </el-form>
            <el-text class="mx-1" type="warning">老师账户的默认密码为:000000</el-text>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible_add = false">取消</el-button>
                    <el-button type="primary" @click="addteacher()">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<style></style>