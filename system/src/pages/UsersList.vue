<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
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
                <el-button type="primary" @click="uploadVisible = true">上传商品</el-button>
            </div>
            <!-- 表格 -->
            <el-table :data="Searchlist.slice((currentPage - 1) * 10, currentPage * 10)" style="width: 100%">
                <el-table-column prop="name" label="名称" width="150" />
                <el-table-column prop="sku_name" label="类目" width="150" />
                <el-table-column prop="price_money" label="价格/￥" width="80" />
                <el-table-column prop="sales" label="销量" width="80" />
                <el-table-column prop="visit" label="浏览量" width="80" />
                <el-table-column prop="file" label="附件链接" />
                <el-table-column prop="description" label="文字详情" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="primary" @click="openedit(scope.row)">编辑</el-button>
                        <el-button type="danger" @click="omit(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="demo-pagination-block">
            <el-pagination :current-page="currentPage" :page-size="10" :total="total" @current-change="handleCurrentChange"
                :hide-on-single-page="true" />
        </div>
        <!-- 编辑 -->
        <el-dialog v-model="editVisible" title="销量以及浏览量的修改">
            <el-form :model="editform">
                <el-form-item label="销量">
                    <el-input v-model="editform.sales" />
                </el-form-item>
                <el-form-item label="浏览量">
                    <el-input v-model="editform.visit" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取消</el-button>
                    <el-button type="primary" @click="edit">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 上传商品 -->
        <el-dialog v-model="uploadVisible" title="上传商品">
            <el-form :model="uploadform">
                <el-form-item label="商品名称">
                    <el-input v-model="uploadform.name" />
                </el-form-item>
                <el-form-item label="选择分类">
                    <el-select v-model="uploadform.sku_name" class="m-2" placeholder="Select">
                        <el-option v-for="item in skuList" :key="item.id" :value="item.name" :label="item.name"
                            @click="getSku_id(item.id)" />
                    </el-select>
                </el-form-item>
                <el-form-item label="是否免费">
                    <el-select v-model="uploadform.mode" class="m-2" placeholder="Select">
                        <el-option v-for="item in modeList" :key="item.id" :value="item.name" :label="item.name"
                            @click="getmode(item.id)" />
                    </el-select>
                </el-form-item>
                <el-form-item label="主图是否上传视频">
                    <el-select v-model="uploadform.videoOrImg" class="m-2" placeholder="Select">
                        <el-option v-for="item in modeList_2" :key="item.id" :value="item.name" :label="item.name"
                            @click="getmode_2(item.id)" />
                    </el-select>
                </el-form-item>
                <el-form-item label="商品文字详情">
                    <el-input v-model="uploadform.description" />
                </el-form-item>
                <el-form-item label="商品价格/￥" v-show="uploadform.mode_id == 0 ? true : false">
                    <el-input v-model="uploadform.price" placeholder="价格" />
                </el-form-item>
                <el-form-item label="网盘链接">
                    <el-input v-model="uploadform.file" />
                </el-form-item>
                <el-form-item label="商品展示图">
                    <el-upload :file-list="uploadform.firstimg" class="upload-demo"
                        action="https://api4.yoobit.cn/uploadFileImg" :on-success="success" :on-remove="remove_1" :limit="1"
                        list-type="picture">
                        <el-button type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商品主图/视频">
                    <el-upload :file-list="uploadform.imgs_1" class="upload-demo"
                        action="https://api4.yoobit.cn/uploadFileImg" :on-success="success_2" :on-remove="remove_2"
                        :limit="limit" list-type="picture">
                        <el-button type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商品详情图">
                    <el-upload :file-list="uploadform.imgs_2" class="upload-demo"
                        action="https://api4.yoobit.cn/uploadFileImg" :on-success="success_3" :on-remove="remove_3"
                        :limit="9" list-type="picture">
                        <el-button type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="uploadVisible = false">取消</el-button>
                    <el-button type="primary" @click="upload">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { getAllStore, delThisSpu, turnVisit, getAllSku, uploadStore } from '../util/request'
import { reactive, toRefs, onMounted, computed } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus'
export default {
    setup() {
        const data = reactive({
            limit: 9,
            userList: [],
            skuList: [],
            modeList: [{ id: 0, name: '不免费' }, { id: 1, name: '免费' }],
            modeList_2: [{ id: 0, name: '上传图片' }, { id: 1, name: '上传视频' }],
            keyword: '',
            currentPage: 1,
            total: 0,
            editVisible: false,
            uploadVisible: false,
            editform: {
                sales: '',
                visit: '',
                id: ''
            },
            uploadform: {
                name: '',
                sku_name: '',
                sku_id: '',
                mode: '',
                videoOrImg: '',
                mode_id: 1,
                videoOrImg_id: 0,
                description: '',
                price: '',
                file: '',
                firstimg: [],
                imgs_1: [],
                imgs_2: []
            }
        })
        // 上传商品展示图
        const success = (e) => {
            data.uploadform.firstimg.push(e.url)
            console.log(data.uploadform.firstimg);
        }
        const remove_1 = (e) => {
            console.log(e.response.url);
            data.uploadform.firstimg.splice(data.uploadform.firstimg.indexOf(e.response.url), 1)
            console.log(data.uploadform.firstimg);
        }
        // 上传商品轮播图
        const success_2 = (e) => {
            data.uploadform.imgs_1.push(e.url)
            console.log(data.uploadform.imgs_1);

        }
        const remove_2 = (e) => {
            console.log(e.response.url);
            data.uploadform.imgs_1.splice(data.uploadform.imgs_1.indexOf(e.response.url), 1)
            console.log(data.uploadform.imgs_1);
        }
        // 上传商品详情图
        const success_3 = (e) => {
            data.uploadform.imgs_2.push(e.url)
            console.log(data.uploadform.imgs_2);

        }
        const remove_3 = (e) => {
            console.log(e.response.url);
            data.uploadform.imgs_2.splice(data.uploadform.imgs_2.indexOf(e.response.url), 1)
            console.log(data.uploadform.imgs_2);
        }
        // 上传商品
        const upload = () => {
            if (data.uploadform.videoOrImg_id == 1) {
                data.limit = 1
            }
            else {
                data.limit = 9
            }
            let x = ''
            let y = ''
            for (let i = 0; i < data.uploadform.imgs_1.length; i++) {
                x += data.uploadform.imgs_1[i] + '|'
            }
            for (let i = 0; i < data.uploadform.imgs_2.length; i++) {
                y += data.uploadform.imgs_2[i] + '|'
            }
            x = x.substring(0, x.length - 1)
            y = y.substring(0, y.length - 1)
            uploadStore({
                name: data.uploadform.name,
                sku_id: data.uploadform.sku_id,
                sku_name: data.uploadform.sku_name,
                mode: data.uploadform.mode_id,
                videoOrImg: data.uploadform.videoOrImg_id,
                description: data.uploadform.description,
                price_coin: data.uploadform.price,
                price_money: data.uploadform.price * 100,
                file: data.uploadform.file,
                first_img: data.uploadform.firstimg[0],
                imgs: data.uploadform.videoOrImg_id == 0 ? x : data.uploadform.imgs_1[0],
                imgs_2: y
            }).then(res => {
                getAllstore()
                ElMessage({
                    type: 'success',
                    showClose: true,
                    message: '上传成功',
                    center: true,
                })
                data.uploadVisible = false
                data.uploadform = {
                    name: '',
                    sku_name: '',
                    sku_id: '',
                    mode: '',
                    mode_id: '',
                    description: '',
                    price: '',
                    file: '',
                    firstimg: [],
                    imgs_1: [],
                    imgs_2: []
                }
            })
        }
        //  获取所有商品
        const getAllstore = () => {
            getAllStore().then(res => {
                for (let i = 0; i < res.spu.length; i++) {
                    res.spu[i].price_money = res.spu[i].price_money / 100
                }
                data.userList = res.spu
                data.total = res.spu.length
                console.log(data.userList);
            })
        }
        // 获取所有Sku
        const getSku = () => {
            getAllSku().then(res => {
                data.skuList = res.sku
            })
        }
        // 搜索计算属性
        const Searchlist = computed(() => {
            return data.userList.filter(item => {
                return item.name.indexOf(data.keyword) !== -1
            })
        })
        // 获取当前页数
        const handleCurrentChange = (e) => {
            data.currentPage = e
        }
        // 打开编辑
        const openedit = (e) => {
            data.editform.sales = e.sales
            data.editform.visit = e.visit
            data.editform.id = e.id
            data.editVisible = true
        }
        // 编辑
        const edit = () => {
            turnVisit({
                spu_id: data.editform.id,
                visit_total: data.editform.visit,
                sale_total: data.editform.sales
            }).then(res => {
                getAllstore()
                ElMessage({
                    type: 'success',
                    showClose: true,
                    message: '修改成功',
                    center: true,
                })
                data.editVisible = false
            })

        }
        // 删除
        const omit = (e) => {
            console.log(e.id);
            delThisSpu({
                spu_id: e.id
            }).then(res => {
                console.log(res);
                getAllstore()
                ElMessage({
                    type: 'success',
                    showClose: true,
                    message: '删除成功',
                    center: true,
                })
            })

        }
        // 获取Sku_id
        const getSku_id = (e) => {
            data.uploadform.sku_id = e
        }
        // 获取mode
        const getmode = (e) => {
            data.uploadform.mode_id = e
            if (data.uploadform.mode_id == 1) {
                data.uploadform.price = 0
            }
            console.log(data.uploadform.mode_id);
        }
        // 获取是否需要视频
        const getmode_2 = (e) => {
            data.uploadform.videoOrImg_id = e
            console.log(data.uploadform.videoOrImg_id);
        }
        getAllstore()
        return {
            ...toRefs(data), onMounted, getSku_id, getAllstore, handleCurrentChange, Searchlist, omit, edit, openedit, getSku, getmode,
            success, remove_1, success_2, remove_2, success_3, remove_3, upload, getmode_2
        }
    },
    mounted() {
        this.getAllstore()
        this.getSku()
    }
}

</script>
<style>
.input_box {
    width: 300px;
    margin-right: 15px;
}

.demo-pagination-block {
    margin-top: 10px;
    margin-bottom: 16px;
    width: 1000px;
}
</style>