<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 白色区域 -->
        <div class="page_content">
            <div class="flex">
                <el-button type="primary" @click="uploadVisible = true">上传轮播图</el-button>
                <el-button type="primary" @click="openregisterVisible">签到 / 看视频积分:{{ registercoin }}(点击修改)</el-button>
                <el-button type="primary" @click="openshareVisible">分享积分:{{ sharecoin }}(点击修改)</el-button>
                <el-button type="primary" @click="opoenhelpVisible">帮助中心文本修改</el-button>
                <el-button type="primary" @click="passwordVisible = true">修改登录密码</el-button>
                <el-button>
                    流量主开关
                    <el-switch v-model="switchs" @change="switchx" />
                </el-button>
            </div>
        </div>
        <!-- 轮播图表格 -->
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="图片">
                <template #default="scope">
                    <el-image style="width: 100px; height: 100px" :src="scope.row.img" alt="" fit="fill"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="target" label="跳转地址" />
            <el-table-column>
                <template #default="scope">
                    <el-button type="danger" @click="deletes(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 上传轮播图 -->
        <el-dialog v-model="uploadVisible" title="上传轮播图">
            <el-form-item label="轮播图">
                <el-upload :file-list="uploadform.firstimg" class="upload-demo"
                    action="https://api4.yoobit.cn/uploadFileImg" :on-success="success" :on-remove="remove" :limit="1"
                    list-type="picture">
                    <el-button type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            <el-form :model="uploadform">
                <el-form-item label="跳转地址">
                    <el-input v-model="uploadform.target" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="uploadVisible = false">取消</el-button>
                    <el-button type="primary" @click="addswiper">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 签到/看视频积分修改 -->
        <el-dialog v-model="registerVisible" title="签到/看视频积分修改">
            <el-form :model="registerform">
                <el-form-item label="积分">
                    <el-input v-model="registerform.coin" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="registerVisible = false">取消</el-button>
                    <el-button type="primary" @click="setfreeCoin">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 分享积分修改 -->
        <el-dialog v-model="shareVisible" title="分享积分修改">
            <el-form :model="shareform">
                <el-form-item label="积分">
                    <el-input v-model="shareform.coin" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="shareVisible = false">取消</el-button>
                    <el-button type="primary" @click="setshareCoin">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 帮助中心文本修改 -->
        <el-dialog v-model="helpVisible" title="帮助中心文本修改">
            <el-form :model="helpform">
                <el-form-item label="帮助文本">
                    <el-input v-model="helpform.text" type="textarea" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="helpVisible = false">取消</el-button>
                    <el-button type="primary" @click="sethelp">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 登陆密码修改 -->
        <el-dialog v-model="passwordVisible" title="登陆密码修改">
            <el-form :model="passwordform">
                <el-form-item label="新密码">
                    <el-input v-model="passwordform.password" type="password" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="passwordVisible = false">取消</el-button>
                    <el-button type="primary" @click="turnPassword">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script>
import { getAllSwiper, addSwiper, getADSwitch, turnADSwitch, delThisSwiperItem, getHelpCenterValue, getSetCoinInfo, setHelpCenterValue, setFreeCoin, setShareCoin, turnAdminPassword } from '../util/request'
import { reactive, toRefs, onMounted } from 'vue';
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
export default {
    setup() {
        const router = useRouter()
        const data = reactive({
            switchs: '',
            keyword: '',
            tableData: [],
            uploadVisible: false,
            registerVisible: false,
            shareVisible: false,
            helpVisible: false,
            passwordVisible: false,
            uploadform: {
                img: [],
                target: ''
            },
            helpvalue: '',
            registercoin: 0,
            sharecoin: 0,
            registerform: {
                coin: 0
            },
            shareform: {
                coin: 0
            },
            helpform: {
                text: ''
            },
            passwordform: {
                password: ''
            }
        })
        // 获取流量主开关
        const getSwitch = () => {
            getADSwitch().then(res => {
                data.switchs = res.adSwitch
                if (res.adSwitch == 1) {
                    data.switchs = true
                }
                else {
                    data.switchs = false
                }
                console.log(res.adSwitch);
                console.log(data.switchs);
            })
        }
        // 更改流量主开关
        const switchx = (e) => {
            console.log(e);
            let x = null
            if (e == true) {
                x = 1
            }
            else {
                x = 0
            }
            turnADSwitch({
                switch: x
            }).then(res => {
                console.log(res);
            })
        }
        // 上传轮播图
        const success = (e) => {
            data.uploadform.img.push(e.url)
            console.log(data.uploadform.img);
        }
        const remove = (e) => {
            console.log(e.response.url);
            data.uploadform.img.splice(data.uploadform.img.indexOf(e.response.url), 1)
            console.log(data.uploadform.img);
        }
        const addswiper = () => {
            addSwiper({
                img: data.uploadform.img[0],
                target: data.uploadform.target
            }).then(res => {
                getSwiper()
                ElMessage({
                    type: 'success',
                    showClose: true,
                    message: '添加成功',
                    center: true,
                })
                data.uploadVisible = false
                data.uploadform.img = []
                data.uploadform.target = ''
            })
        }
        // 删除轮播图
        const deletes = (e) => {
            delThisSwiperItem({
                id: e.id
            }).then(res => {
                getSwiper()
                ElMessage({
                    type: 'success',
                    showClose: true,
                    message: '删除成功',
                    center: true,
                })
            })
        }
        // 得到轮播图
        const getSwiper = () => {
            getAllSwiper().then(res => {
                data.tableData = res.list
            })
        }
        // 获取帮助中心文本
        const getHelp = () => {
            getHelpCenterValue().then(res => {
                data.helpvalue = res.file
            })
        }
        // 获取签到以及分享的积分
        const getCoin = () => {
            getSetCoinInfo().then(res => {
                data.registercoin = res.get_coin
                data.sharecoin = res.share_coin
            })
        }
        // 打开签到积分修改
        const openregisterVisible = () => {
            data.registerVisible = true
            data.registerform.coin = data.registercoin
        }
        // 签到/看是皮积分修改
        const setfreeCoin = () => {
            setFreeCoin({
                setCoin: data.registerform.coin
            }).then(res => {
                getCoin()
                ElMessage({
                    type: 'success',
                    showClose: true,
                    message: '修改成功',
                    center: true,
                })
                data.registerVisible = false
            })
        }
        // 打开分享积分修改
        const openshareVisible = () => {
            data.shareVisible = true
            data.shareform.coin = data.sharecoin
        }
        // 分享积分修改
        const setshareCoin = () => {
            setShareCoin({
                setCoin: data.shareform.coin
            }).then(res => {
                getCoin()
                ElMessage({
                    type: 'success',
                    showClose: true,
                    message: '修改成功',
                    center: true,
                })
                data.shareVisible = false
            })
        }
        //打开帮助文本中心修改        
        const opoenhelpVisible = () => {
            data.helpVisible = true,
                data.helpform.text = data.helpvalue
        }
        // 帮助中心文本修改
        const sethelp = () => {
            setHelpCenterValue({
                file: data.helpform.text
            }).then(res => {
                getHelp()
                ElMessage({
                    type: 'success',
                    showClose: true,
                    message: '修改成功',
                    center: true,
                })
                data.helpVisible = false
            })
        }
        // 修改登录密码
        const turnPassword = () => {
            turnAdminPassword({
                password: data.passwordform.password
            }).then(res => {
                ElMessage({
                    type: 'success',
                    showClose: true,
                    message: '修改成功',
                    center: true,
                })
                router.push({
                    path: '/login'
                })
            })
        }
        onMounted(() => {
            getSwiper()
            getHelp()
            getCoin()
            getSwitch()
        })
        getSwiper()
        return {
            ...toRefs(data), getSwiper, success, remove, addswiper, deletes, getHelp, getCoin, setfreeCoin, setshareCoin,
            openregisterVisible, openshareVisible, opoenhelpVisible, sethelp, turnPassword, switchx, getSwitch
        }
    }
}
</script>