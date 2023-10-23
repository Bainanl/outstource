<script setup>
import { getcategoriesAPI, delCategoriesAPI, addCategoriesAPI, upLoadGetTokenAvatarAPI } from '@/apis/api.js'
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router'
import 'element-plus/es/components/message/style/css'
import { ElMessage, ElLoading } from 'element-plus'

const router = useRouter()
// 所有油卡信息
const AlloilcardInfo = ref([])
const getcategories = async () => {
    const res = await getcategoriesAPI()
    console.log(res);
    AlloilcardInfo.value = res.list
}
onMounted(() => getcategories())
// 搜索
let keyword = ref('')
const searchlist = computed(() => {
    return AlloilcardInfo.value?.filter(item => {
        return item.name.indexOf(keyword.value) !== -1
    })
})
// 跳转到详情页面
const details = (id) => {
    router.push(`/oilcarddetails/${id}`)
}
// 删除油卡
let id_del = ref(null)
let dialogVisible_del = ref(false)
const visible_del = (id) => {
    dialogVisible_del.value = true
    id_del.value = id
}
const omit = async () => {
    await delCategoriesAPI({ id: id_del.value })
    getcategories()
    dialogVisible_del.value = false
    ElMessage({ type: 'success', message: '删除成功' })
}

// 上传图片到服务器
let imgdata = ref({
    key: '',
    token: ''
})
let filelist = ref([])
let imgUrl = ref('')
const uploadRef = ref(null)
const exceed = () => {
    ElMessage({ type: 'success', message: '添加成功' })
}
const changeimg = async (e) => {
    if (e.status == 'ready') {
        if (e.raw.size > 524288000) {
            ElMessage({ type: 'warning', message: '上传图片不能超过500kb' })
        } else {
            const res = await upLoadGetTokenAvatarAPI({ type: e.raw.type.slice(6) })
            imgdata.value.key = res.key
            imgdata.value.token = res.token
            imgUrl.value = res.url
        }
    }
}
// 添加油卡
let dialogVisible_add = ref(false)
let oilcardName = ref('')
const loading = ref(false)
const addoilcard = async () => {
    if (oilcardName.value == '' || imgUrl.value == '') {
        ElMessage({ type: 'warning', message: '请输入完整' })
    }
    else {
        loading.value = true
        await uploadRef.value.submit()
        loading.value = false
        const res = await addCategoriesAPI({ name: oilcardName.value, image: imgUrl.value })
        ElMessage({ type: 'success', message: '添加成功' })
        dialogVisible_add.value = false
        getcategories()
        oilcardName.value = ''
        imgUrl.value = ''
        imgdata = {
            key: '',
            token: ''
        }
        await uploadRef.value.clearFiles()
    }

}
</script>

<template>
    <!-- 面包屑 -->
    <div style="margin-bottom:10px">
        <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/' }" replace>油卡管理</el-breadcrumb-item>
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
            <el-button type="primary" style="margin-left: 50px;" @click="dialogVisible_add = true">添加油卡</el-button>
            <!-- <el-button type="primary" style="margin-left: 50px;" @click="exportcommend">导出本周评价</el-button> -->
        </div>
        <!-- 表格 -->
        <el-table :data="searchlist">
            <el-table-column prop="name" label="油卡名称" />
            <el-table-column label="图片">
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-image style="width: 100px; height: 100px" :src="scope.row.img" fit="cover" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" @click="details(scope.row.id)">查看详情</el-button>
                    <el-button type="danger" @click="visible_del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 是否删除 -->
        <el-dialog v-model="dialogVisible_del" title="删除" width="30%">
            <span>是否要删除该品牌?</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible_del = false">取消</el-button>
                    <el-button type="primary" @click="omit()">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 添加油卡 -->
        <el-dialog v-model="dialogVisible_add" title="添加油卡品牌" width="30%">
            <el-form v-loading="loading" element-loading-text="Loading...">
                <el-form-item label="油卡名称">
                    <el-input v-model="oilcardName" />
                </el-form-item>
                <el-form-item label="上传图片">
                    <el-upload ref="uploadRef" class="upload-demo" action="https://up-z1.qiniup.com" list-type="picture"
                        :data="imgdata" :auto-upload="false" :limit="1" @on-exceed="exceed" :on-change="changeimg"
                        :file-list="filelist">
                        <template #trigger>
                            <el-button type="primary">选择图片</el-button>
                        </template>

                        <template #tip>
                            <div class="el-upload__tip">
                                jpg/png files with a size less than 500kb
                            </div>
                        </template>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible_add = false">取消</el-button>
                    <el-button type="primary" @click="addoilcard()">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<style></style>