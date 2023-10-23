<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>会员管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 白色区域 -->
        <div class="page_content">
            <div class="flex">
                <el-button type="primary" @click="vipInfoVisible = true">修改会员信息</el-button>
            </div>
        </div>
        <el-table :data="vipList" style="width: 100%">
            <el-table-column prop="name" label="会员名称" />
            <el-table-column prop="date" label="持续时间/天" />
            <el-table-column prop="remain" label="每天免费下载次数" />
        </el-table>
        <!-- 修改会员信息 -->
        <el-dialog v-model="vipInfoVisible" title="修改会员信息">
            <el-form :model="vipform">
                <el-form-item label="选择会员">
                    <el-select v-model="vipform.vip_name" class="m-2" placeholder="Select">
                        <el-option v-for="item in viplist" :key="item.id" :value="item.name" @click="getvip_id(item.id)" />
                    </el-select>
                </el-form-item>
                <el-form-item label="持续时间/天">
                    <el-input v-model="vipform.date" />
                </el-form-item>
                <el-form-item label="每天下载次数">
                    <el-input v-model="vipform.remain" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="vipInfoVisible = false">取消</el-button>
                    <el-button type="primary" @click="revisevip">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import { reactive, toRefs, onMounted } from 'vue'
import { getVip, turnVipInfoDateAndRemain } from '../util/request'
import { ElMessage } from 'element-plus'
export default {
    setup() {
        const data = reactive({
            vipInfoVisible: false,
            vipform: {
                vip_name: '',
                vip_id: null,
                date: null,
                remain: null
            },
            vipList: [],
            viplist: [{ id: 1, name: '极速会员' }, { id: 2, name: '黄金会员' }, { id: 3, name: '白金会员' }, { id: 4, name: '钻石会员' }]
        })
        const getallVip = () => {
            getVip().then(res => {
                let list = []
                list.push(res.vip_1)
                list.push(res.vip_2)
                list.push(res.vip_3)
                list.push(res.vip_4)
                data.vipList = list
            })
        }
        const getvip_id = (e) => {
            data.vipform.vip_id = e
            console.log(data.vipform.vip_id);
        }
        const revisevip = () => {
            turnVipInfoDateAndRemain({
                mode: data.vipform.vip_id,
                vip_date: data.vipform.date,
                remain: data.vipform.remain
            }).then(res => {
                getallVip()
                ElMessage({
                    type: 'success',
                    showClose: true,
                    message: '修改成功',
                    center: true,
                })
                data.vipform = {
                    vip_name: '',
                    vip_id: null,
                    date: null,
                    remain: null
                }
                data.vipInfoVisible = false
            })
        }
        onMounted(() => {
            getallVip()
        })
        return {
            ...toRefs(data), getallVip, getvip_id, revisevip
        }
    }

}
</script>