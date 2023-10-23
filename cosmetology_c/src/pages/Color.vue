<template>
    <div>
        <div class="flex">
            <el-button type="primary" @click="dialogFormVisible_1 = true">上传新颜色</el-button>
            <el-button type="primary" @click="dialogFormVisible_2 = true">更新介绍页图片</el-button>
            <el-button type="primary" @click="dialogFormVisible_3 = true">更新操作流程图片</el-button>
            <el-button type="primary" @click="dialogFormVisible_4 = true">更新云色库轮播图</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%;margin-top:20px">
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="L" label="L" />
            <el-table-column prop="a" label="a" />
            <el-table-column prop="b" label="b" />
        </el-table>
        <el-pagination small background layout="prev, pager, next" :total="total" class="mt-4"
            v-model:current-page="current" @current-change="pageup" />
        <!-- 上传新颜色弹出窗 -->
        <el-dialog v-model="dialogFormVisible_1" title="上传新颜色">
            <el-form :model="Colorform" label-position="right" label-width="80px" :rules="rules" ref="uForm">
                <el-form-item label="颜色名称" prop="name">
                    <el-input v-model="Colorform.name" />
                </el-form-item>
                <el-form-item label="hex" prop="hex">
                    <el-input v-model="Colorform.hex" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible_1 = false">Cancel</el-button>
                    <el-button type="primary" @click="submit_1(uForm)">
                        Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 更新介绍图片 -->
        <el-dialog v-model="dialogFormVisible_2" title="更新介绍页图片">
            <el-upload v-model:file-list="fileList" action="https://api4.yoobit.cn/xiaofu/upload" list-type="picture-card">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible_2 = false">Cancel</el-button>
                    <el-button type="primary" @click="submit_2()">
                        Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 更新操作流程图片 -->
        <el-dialog v-model="dialogFormVisible_3" title="更新操作流程图片">
            <el-upload v-model:file-list="fileList_2" action="https://api4.yoobit.cn/xiaofu/upload"
                list-type="picture-card">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible_3 = false">Cancel</el-button>
                    <el-button type="primary" @click="submit_3()">
                        Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 更新云色库轮播图 -->
        <el-dialog v-model="dialogFormVisible_4" title="更新云色库轮播图">
            <el-upload v-model:file-list="fileList_3" action="https://api4.yoobit.cn/xiaofu/upload"
                list-type="picture-card">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogFormVisible_4 = false">Cancel</el-button>
                    <el-button type="primary" @click="submit_4()">
                        Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import { getColor, addColor, updateShare, updateflowpath, updateswiper } from '../utils/request.js'
import { toRefs, reactive, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
export default {
    setup() {
        const uForm = ref()
        const data = reactive({
            tableData: [],
            total: null,
            current: 1,
            keyword: '',
            dialogFormVisible_1: false,
            dialogFormVisible_2: false,
            dialogFormVisible_3: false,
            dialogFormVisible_4: false,
            Colorform: {
                name: '',
                hex: ''
            },
            rules: {
                name: { required: true },
                hex: { required: true, },
            },
            fileList: [],
            fileList_2: [],
            fileList_3: []
        })
        const pagination = () => {
            getColor({
                page: 1,
                per_page: 10
            }).then(res => {
                console.log(res);
                data.tableData = res.list
                data.total = res.total
            })
        }
        const pageup = (e) => {
            getColor({
                page: e,
                per_page: 10
            }).then(res => {
                data.tableData = res.list
                data.total = res.total
            })
        }
        // 上传新颜色
        const submit_1 = (formEl) => {
            formEl.validate(res => {
                if (!res) {
                    return
                }
                else {
                    addColor({
                        name: data.Colorform.name,
                        hex: data.Colorform.hex,
                    }).then(res => {
                        pagination()
                        ElMessage({
                            message: '添加成功',
                            type: 'success',
                        })
                        data.dialogFormVisible_1 = false

                    })
                }
            })
        }
        // 上传分享页图片
        const submit_2 = () => {
            let list = []
            data.fileList.forEach(item => {
                list.push(item.response.url)
            });
            let img = list.join('|')
            if (img == '') {
                ElMessage({
                    message: '请上传至少一张图片',
                    type: 'error',
                })
            }
            else {
                updateShare({
                    img: img
                }).then(res => {
                    ElMessage({
                        message: '修改成功',
                        type: 'success',
                    })
                    data.dialogFormVisible_2 = false
                })
            }
        }
        // 上传操作流程图片
        const submit_3 = () => {
            let list = []
            data.fileList_2.forEach(item => {
                list.push(item.response.url)
            });
            let img = list.join('|')
            if (img == '') {
                ElMessage({
                    message: '请上传至少一张图片',
                    type: 'error',
                })
            }
            else {
                updateflowpath({
                    img: img
                }).then(res => {
                    ElMessage({
                        message: '修改成功',
                        type: 'success',
                    })
                    data.dialogFormVisible_3 = false
                })
            }
        }
        // 上传轮播图
        const submit_4 = () => {
            let list = []
            data.fileList_3.forEach(item => {
                list.push(item.response.url)
            });
            let img = list.join('|')
            if (img == '') {
                ElMessage({
                    message: '请上传至少一张图片',
                    type: 'error',
                })
            }
            else {
                updateswiper({
                    img: img
                }).then(res => {
                    ElMessage({
                        message: '修改成功',
                        type: 'success',
                    })
                    data.dialogFormVisible_4 = false
                })
            }
        }
        onMounted(() => {
            pagination()
        })
        return {
            pagination, ...toRefs(data), pageup, submit_1, uForm, submit_2, submit_3, submit_4
        }
    },
}
</script>
<style></style>