<script setup>
import { getThisTeacherInfoAPI, getAllTeacherToClassThisWeekAPI, getAllCourseAPI, getAllClassAPI, turnTeacherInfoAPI, delTeacherToClassAPI } from '@/apis/api.js'
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router'
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
const route = useRoute()

// 获取特定老师带课信息
const ThisTeacherInfo = ref([])
const getThisTeacherInfo = async () => {
    const res = await getThisTeacherInfoAPI({ id: route.params.id })
    ThisTeacherInfo.value = res.classList
}
onMounted(() => {
    getThisTeacherInfo()
})
//  获取老师本周的评价信息
const Thisweekcommentlist = ref([])
const getAllTeacherToClassThisWeek = async () => {
    const res = await getAllTeacherToClassThisWeekAPI({ id: route.params.id })
    Thisweekcommentlist.value = res.list
}
onMounted(() => getAllTeacherToClassThisWeek())
// 获取所有课程信息
const CourseList = ref([])
const getAllCourse = async () => {
    const res = await getAllCourseAPI()
    CourseList.value = res.list
}
onMounted(() => getAllCourse())
// 获取所有班级信息
const ClassList = ref([])
const getAllClass = async () => {
    const res = await getAllClassAPI()
    ClassList.value = res.list
}
onMounted(() => getAllClass())
// 添加老师所带课程
let dialogVisible_cou = ref(false)
let SelectedCourse = ref('')
let SelectedClass = ref('')
let ClassId = ref(null)
let CourseId = ref(null)
const getClassId = (id) => {
    ClassId.value = id
}
const getCourseId = (id) => {
    CourseId.value = id
}
const addcourse = async () => {
    if (SelectedClass == '' || SelectedCourse == '') {
        ElMessage({ type: 'warning', message: '请选择完整' })
    }
    else {
        const res = await turnTeacherInfoAPI({ id: route.params.id, class: ClassId.value, course: CourseId.value })
        getThisTeacherInfo()
        ElMessage({ type: 'success', message: '添加成功' })
        dialogVisible_cou.value = false
    }
}
// 删除老师相关课程
let dialogVisible_del = ref(false)
let id_del = ref(null)
const visable_del = (id) => {
    id_del.value = id
    dialogVisible_del.value = true
}
const omit = async () => {
    const res = await delTeacherToClassAPI({ id: id_del.value })
    getThisTeacherInfo()
    ElMessage({ type: 'success', message: '删除成功' })
    dialogVisible_del.value = false
}
</script>

<template>
    <!-- 面包屑 -->
    <div style="margin-bottom:10px">
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }" replace>老师管理</el-breadcrumb-item>
            <el-breadcrumb-item>详细信息</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <!-- 老师课程相关信息 -->
    <h1 style="font-size:25px">老师课程相关信息</h1>
    <div class="page_content">

        <div class="flex">
            <el-button type="primary" @click="dialogVisible_cou = true">添加老师所带课程</el-button>
        </div>
        <!-- 表格 -->
        <el-table :data="ThisTeacherInfo">
            <el-table-column prop="class_name" label="所带班级" />
            <el-table-column prop="course_name" label="所带课程" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="danger" @click="visable_del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加老师所带课程 -->
        <el-dialog v-model="dialogVisible_cou" title="添加老师所带课程" width="30%">
            <el-form>
                <el-form-item label="请选择班级">
                    <el-select v-model="SelectedClass" placeholder="Select">
                        <el-option v-for="item in ClassList" :key="item.id" :label="item.name" :value="item.name"
                            @click="getClassId(item.id)" />
                    </el-select>
                </el-form-item>
                <el-form-item label="请选择课程">
                    <el-select v-model="SelectedCourse" placeholder="Select">
                        <el-option v-for="item in CourseList" :key="item.id" :label="item.name" :value="item.name"
                            @click="getCourseId(item.id)" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible_cou = false">取消</el-button>
                    <el-button type="primary" @click="addcourse()">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 是否删除 -->
        <el-dialog v-model="dialogVisible_del" title="删除课程" width="30%">
            <span>是否要删除该老师所带课程?</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible_del = false">取消</el-button>
                    <el-button type="primary" @click="omit()">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
    <!-- 老师评价相关信息 -->
    <h1 style="font-size:25px;margin-top:30px">老师评价相关信息</h1>
    <div class="page_content">

        <!-- <div class="flex">
            <el-button type="primary">老师评价相关信息</el-button>
        </div> -->
        <!-- 表格 -->
        <el-table :data="Thisweekcommentlist">
            <el-table-column prop="class_name" label="所带班级" />
            <el-table-column prop="course_name" label="所带课程" />
            <el-table-column prop="has_this_week" label="是否评价" />
            <el-table-column prop="level" label="评价等级" />
            <el-table-column prop="alert" label="待改进" />
        </el-table>
    </div>
</template>
<style></style>