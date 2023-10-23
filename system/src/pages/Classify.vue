<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>分类列表</el-breadcrumb-item>
        </el-breadcrumb>
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
                <el-button type="primary" @click="uploadVisible = true">上传分类</el-button>
            </div>
        </div>
        <!-- 表格 -->
        <el-table :data="searchlist" style="width: 100%">
            <el-table-column prop="name" label="Name" />
            <el-table-column>
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
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="uploadVisible = false">取消</el-button>
                    <el-button type="primary" @click="addsku">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import { getAllSku, addSku, delThisSku } from '../util/request'
import { reactive, toRefs, onMounted, computed } from 'vue';
import { ElMessage } from 'element-plus'
export default {
    setup() {
        const data = reactive({
            keyword: '',
            uploadVisible: false,
            tableData: [],
            uploadform: {
                name: ''
            }
        })
        const getSku = () => {
            getAllSku().then(res => {
                data.tableData = res.sku
            })
        }
        //添加分类
        const addsku = () => {
            addSku({
                name: data.uploadform.name
            }).then(res => {
                getSku()
                ElMessage({
                    type: 'success',
                    showClose: true,
                    message: '添加成功',
                    center: true,
                })
                data.uploadVisible = false
                data.uploadform = {
                    name: ''
                }
            })

        }
        // 删除分类
        const deletes = (e) => {
            console.log(e.id);
            delThisSku({
                sku_id: e.id
            }).then(res => {
                getSku()
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
        onMounted(() => {
            getSku()
        })
        getSku()
        return {
            ...toRefs(data), getSku, addsku, deletes, searchlist
        }
    }
}
</script>