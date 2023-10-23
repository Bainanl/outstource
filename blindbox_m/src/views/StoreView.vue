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
                <div class="flex-row items-center justify-between" style="height:50px;width:350px">
                    <el-select v-model="blindid" class="m-2" placeholder="Select" size="default" @change="getblindInfo">
                        <el-option v-for="item in tableData" :key="item.name" :label="item.name" :value="item.id" />
                    </el-select>
                    <el-button type="primary" @click="uploadVisible = true"
                        :disabled="blindid == '' ? true : false">添加商品</el-button>
                </div>
            </div>
        </div>
        <!-- 表格 -->
        <el-table :data="searchlist" style="width: 100%">
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="describe" label="描述" />
            <el-table-column prop="price" label="价格" />
            <el-table-column prop="percent" label="权重" />
            <el-table-column prop="level_name" label="稀有程度" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="danger" @click="deletes(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 上传 -->
        <el-dialog v-model="uploadVisible" title="上传盲盒内商品">
            <el-form :model="uploadform">
                <el-form-item label="商品名称">
                    <el-input v-model="uploadform.name" />
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="uploadform.describe" />
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="uploadform.price" />
                </el-form-item>
                <el-form-item label="权重">
                    <el-input v-model="uploadform.num" />
                </el-form-item>
                <el-form-item label="稀有程度">
                    <el-select v-model="uploadform.levelid" class="m-2" placeholder="Select" size="large">
                        <el-option v-for="item in list_level" :key="item.name" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="商品展示图片">
                    <el-upload list-type="picture" class="upload-demo" action="https://api4.yoobit.cn/box/upload"
                        :on-success="success" :on-remove="remove" :limit="1">
                        <el-button type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商品详情图片">
                    <el-upload list-type="picture" class="upload-demo" action="https://api4.yoobit.cn/box/upload"
                        :on-success="success_2" :on-remove="remove_2" :limit="9">
                        <el-button type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="uploadVisible = false">取消</el-button>
                    <el-button type="primary" @click="addstore">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import { getblind, admindel, getAllsku, addblindstore, getinfo, getlevel } from '../util/request'
import { reactive, toRefs, onMounted, computed } from 'vue';
import { ElMessage } from 'element-plus'
export default {
    setup() {
        const data = reactive({
            list_level: [],
            list_table: [],
            blindid: '',
            list: [],
            keyword: '',
            uploadVisible: false,
            tableData: [],
            uploadform: {
                name: '',
                firstimg: '',
                price: '',
                describe: '',
                num: '',
                levelid: '',
                img: []
            },
            t_sku_id: ''
        })
        // 获取所有所有稀有程度名称
        const getAlllevel = () => {
            getlevel({}).then(res => {
                data.list_level = res.list
            })
        }
        // 获取盲盒内信息
        const getblindInfo = () => {
            getinfo({
                id: data.blindid
            }).then(res => {
                data.list_table = res.list
                let t_sku_id = data.tableData.find(item => {
                    return item.id == data.blindid
                })
                data.t_sku_id = t_sku_id.t_sku_id
            })

        }
        // 获取所有分类
        const getsku = () => {
            getAllsku({}).then(res => {
                data.list = res.list
            })
        }
        // 添加商品
        const addstore = () => {
            let img = data.uploadform.img.join('|')
            addblindstore({
                name: data.uploadform.name,
                index_img: data.uploadform.firstimg,
                price: data.uploadform.price,
                describe: data.uploadform.describe,
                sku_id: data.blindid,
                img: img,
                percent: data.uploadform.num,
                level: data.uploadform.levelid,
                t_sku_id: data.t_sku_id
            }).then(res => {
                getblindInfo()
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
                    describe: '',
                    num: '',
                    levelid: '',
                    img: []
                }
            })
        }
        // 成功上传
        const success_2 = (e) => {
            data.uploadform.img.push(e.url)
        }
        // 移除
        const remove_2 = (e) => {
            data.uploadform.img.splice(data.uploadform.img.indexOf(e.response.url), 1)
        }
        // 成功上传
        const success = (e) => {
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
                type: 2,
                id: e.id
            }).then(res => {
                getblindInfo()
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
            return data.list_table.filter(item => {
                return item.name.indexOf(data.keyword) !== -1
            })
        })
        // 初始化
        onMounted(() => {
            getAllblind()
            getsku()
            getAlllevel()
        })
        return {
            ...toRefs(data), getAllblind, searchlist, deletes, success, remove, addstore, getsku, getblindInfo, getAlllevel, success_2, remove_2,
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