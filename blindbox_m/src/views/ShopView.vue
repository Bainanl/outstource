<template>
    <div class="flex-row justify-around">
        <el-button type="primary" v-for="item in list" :key="item.id" @click="open(item.name)">{{ item.name }}</el-button>
    </div>
    <!-- 修改内容 -->
    <el-dialog v-model="uploadVisible" :title="title">
        <el-form :model="uploadform">
            <el-form-item :label="title">
                <el-input v-model="uploadform.value" type="textarea" autosize />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="uploadVisible = false">取消</el-button>
                <el-button type="primary" @click="submit">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script>
import { turnadmin } from '../util/request'
import { reactive, toRefs } from 'vue';
import { ElMessage } from 'element-plus'
export default {
    setup() {
        const data = reactive({
            uploadform: {
                value: ''
            },
            title: '',
            uploadVisible: false,
            list: [{
                name: '登录密码修改',
                id: 1
            },
            {
                name: '用户协议修改',
                id: 2
            },
            {
                name: '隐私政策修改',
                id: 3
            },
            {
                name: '合规指引修改',
                id: 4
            }
                , {
                name: '风险告知修改',
                id: 5
            }]
        })
        const open = (title) => {
            data.uploadVisible = true
            data.title = title
        }
        // 修改
        const submit = () => {
            let admin = ''
            if (data.title == '登录密码修改') {
                admin = 'adminPassword'
            }
            else {
                admin = data.title
            }
            console.log(admin);
            turnadmin({
                name: admin,
                file: data.uploadform.value
            }).then(res => {
                if (res.code == 1) {
                    data.uploadVisible = false
                    ElMessage({
                        type: 'success',
                        showClose: true,
                        message: '修改成功',
                        center: true,
                    })
                }
                else {
                    ElMessage({
                        type: 'error',
                        showClose: true,
                        message: '修改失败',
                        center: true,
                    })
                }
                data.uploadform.value = ''
            })
        }
        return {
            ...toRefs(data), open, submit
        }
    }
}
</script>