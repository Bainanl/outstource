<template>
    <div>
        <!-- 面包屑 -->
        <!-- <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>分类列表</el-breadcrumb-item>
        </el-breadcrumb> -->
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
                <el-button type="primary" @click="uploadVisible = true" style="margin-top: 10px;">上传分类</el-button>
            </div>
        </div>
        <!-- 表格 -->
        <el-table :data="searchlist" style="width: 100%">
            <el-table-column prop="name" label="分类名" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="danger" @click="deletes(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 上传分类 -->
        <el-dialog v-model="uploadVisible" title="上传分类">
            <el-form :model="uploadform">
                <el-form-item label="分类名">
                    <el-input v-model="uploadform.name" />
                </el-form-item>
                <el-form-item label="分类图片">
                    <el-upload list-type="picture" class="upload-demo" action="https://api4.yoobit.cn/box/upload"
                        :on-success="success" :on-remove="remove" :limit="1">
                        <el-button type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="uploadVisible = false">取消</el-button>
                    <el-button type="primary" @click="addclassity">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import { getAllsku, admindel, addsku } from '../util/request'
import { reactive, toRefs, onMounted, computed } from 'vue';
import { ElMessage } from 'element-plus'
export default {
    setup() {
        const data = reactive({
            keyword: '',
            uploadVisible: false,
            tableData: [],
            uploadform: {
                name: '',
                firstimg: ''
            }
        })
        // 添加分类
        const addclassity = () => {
            addsku({
                name: data.uploadform.name,
                index_img: data.uploadform.firstimg
            }).then(res => {
                getsku()
                ElMessage({
                    type: 'success',
                    showClose: true,
                    message: '添加成功',
                    center: true,
                })
                data.uploadVisible = false
                data.uploadform = {
                    name: '',
                    firstimg: ''
                }
            })
        }
        // 成功上传
        const success = (e) => {
            console.log(e);
            data.uploadform.firstimg = e.url
        }
        // 移除
        const remove = (e) => {
            data.uploadform.firstimg = ''
        }
        // 获取所有分类
        const getsku = () => {
            getAllsku({}).then(res => {
                data.tableData = res.list
            })
        }
        // 删除
        const deletes = (e) => {
            admindel({
                type: 0,
                id: e.id
            }).then(res => {
                getsku()
                ElMessage({
                    type: 'success',
                    showClose: true,
                    message: '删除成功',
                    center: true,
                })
            })
        }
        // 搜索
        const searchlist = computed(() => {
            return data.tableData.filter(item => {
                return item.name.indexOf(data.keyword) !== -1
            })
        })
        // 初始化
        onMounted(() => {
            getsku()
        })
        return {
            ...toRefs(data), getsku, searchlist, deletes, success, remove, addclassity
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