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
                <el-button type="primary" @click="uploadVisible = true" style="margin-top: 10px;">添加盲盒</el-button>
            </div>
        </div>
        <!-- 表格 -->
        <el-table :data="searchlist" style="width: 100%">
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="t_sku_name" label="所属分类" />
            <el-table-column prop="price" label="价格" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="danger" @click="deletes(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 上传 -->
        <el-dialog v-model="uploadVisible" title="上传盲盒">
            <el-form :model="uploadform">
                <el-form-item label="盲盒名称">
                    <el-input v-model="uploadform.name" />
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="uploadform.price" />
                </el-form-item>
                <el-form-item label="分类">
                    <el-select v-model="uploadform.classityid" class="m-2" placeholder="Select" size="large">
                        <el-option v-for="item in list" :key="item.name" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="盲盒图片">
                    <el-upload list-type="picture" class="upload-demo" action="https://api4.yoobit.cn/box/upload"
                        :on-success="success" :on-remove="remove" :limit="1">
                        <el-button type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="uploadVisible = false">取消</el-button>
                    <el-button type="primary" @click="addtheblind">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import { getblind, admindel, getAllsku, addblind } from '../util/request'
import { reactive, toRefs, onMounted, computed } from 'vue';
import { ElMessage } from 'element-plus'
export default {
    setup() {
        const data = reactive({
            list: [],
            keyword: '',
            uploadVisible: false,
            tableData: [],
            uploadform: {
                name: '',
                firstimg: '',
                price: '',
                classityid: '',
            }
        })
        // 获取所有分类
        const getsku = () => {
            getAllsku({}).then(res => {
                data.list = res.list
            })
        }
        // 添加盲盒
        const addtheblind = () => {
            addblind({
                name: data.uploadform.name,
                index_img: data.uploadform.firstimg,
                price: data.uploadform.price,
                t_sku_id: data.uploadform.classityid
            }).then(res => {
                getAllblind()
                ElMessage({
                    type: 'success',
                    showClose: true,
                    message: '添加成功',
                    center: true,
                })
                data.uploadVisible = false
                data.uploadform = {
                    name: '',
                    firstimg: '',
                    price: '',
                    classityid: ''
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
        // 获取所有盲盒
        const getAllblind = () => {
            getblind({}).then(res => {
                data.tableData = res.list
            })
        }
        // 删除
        const deletes = (e) => {
            admindel({
                type: 1,
                id: e.id
            }).then(res => {
                getAllblind()
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
            getAllblind()
            getsku()
        })
        return {
            ...toRefs(data), getAllblind, searchlist, deletes, success, remove, addtheblind, getsku
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