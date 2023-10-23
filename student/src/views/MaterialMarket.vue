<template>
    <div>

        <div class="input">
            <input v-model="input" placeholder="Please input"
                style="border:0; background-color: #ae3628;height:29px;width: 268px;" />
        </div>
        <div class="search flex-row items-center">
            <img src="../assets/image/search_1(1).png" alt="" style="height:50px;">
            <el-button type="success" plain text color="#F4C867" size="large" class="button" @click="search">搜索</el-button>
        </div>
        <div class="view flex-row" style="flex-wrap:wrap;">
            <div class="flex-col" style="margin-left:50px;margin-top:5px" v-for="item in img" :key="item.value"
                v-show="item.show" @click="detail(item.value, item.name)">
                <el-image :src="item.src" :fit="fit" :class="showpurchase == true ? 'img_2' : 'img'" />
                <span :class="showpurchase == true ? 'text_2' : 'text'">{{ item.name }}</span>
            </div>
            <div v-if="showpurchase" class="purchase flex-col">
                <span class="text_1">名称:{{ name }}</span>
                <span class="text_1">价格:￥0</span>
                <el-button color="#4169E1" size="large" class="button_1">购买</el-button>
            </div>
        </div>

    </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
export default {
    setup() {
        let data = reactive({
            img: [{
                value: 0,
                src: require('../assets/image/sucai/sucai_1.png'),
                name: '花鸟纹',
                show: true
            },
            {
                value: 1,
                src: require('../assets/image/sucai/sucai_2.png'),
                name: '凤纹',
                show: true
            },
            {
                value: 2,
                src: require('../assets/image/sucai/sucai_3.png'),
                name: '桃形花瓣几何纹',
                show: true
            },
            {
                value: 3,
                src: require('../assets/image/sucai/sucai_4.png'),
                name: '火纹',
                show: true
            },
            {
                value: 4,
                src: require('../assets/image/sucai/sucai_5.png'),
                name: '夔龙纹',
                show: true
            },
            {
                value: 5,
                src: require('../assets/image/sucai/sucai_6.png'),
                name: '回纹宝相花团',
                show: true
            },
            {
                value: 6,
                src: require('../assets/image/sucai/sucai_7.png'),
                name: '象纹',
                show: true
            },
            {
                value: 7,
                src: require('../assets/image/sucai/sucai_8.png'),
                name: '云雷纹',
                show: true
            },
            {
                value: 8,
                src: require('../assets/image/sucai/sucai_9.png'),
                name: '荷花纹',
                show: true
            },
            {
                value: 9,
                src: require('../assets/image/sucai/sucai_10.png'),
                name: '万字纹',
                show: true
            },
            {
                value: 10,
                src: require('../assets/image/sucai/sucai_11.png'),
                name: '祥云纹',
                show: true
            },
            {
                value: 11,
                src: require('../assets/image/sucai/sucai_12.png'),
                name: '垂鳞纹',
                show: true
            },
            ],
            input: '',
            showpurchase: false,
            fit: 'fill',
            name: ''
        })
        const search = () => {
            console.log(data.input);
            for (let i = 0; i < data.img.length; i++) {
                if (data.img[i].name.includes(data.input)) {
                    data.img[i].show = true
                    data.showpurchase = false
                    data.fit = 'fill'
                }
                else {
                    data.img[i].show = false
                    data.showpurchase = false
                    data.fit = 'fill'
                }
            }
        }
        const detail = (value, name) => {
            for (let i = 0; i < data.img.length; i++) {
                if (data.img[i].value == value) {
                    data.img[i].show = true
                    data.showpurchase = true
                    data.fit = 'scale-down'
                    data.name = name
                } else {
                    data.img[i].show = false
                }
            }
        }
        return {
            ...toRefs(data), search, detail
        }
    }
}
</script>
<style scoped>
.button_1 {
    margin-top: 40px;
    width: 100px;
}

.purchase {
    width: 35vw;
    margin-left: 5vw;
    margin-top: 2vh;
    font-size: 25px;
}

.img_2 {
    width: 15vw;
}

.text_2 {
    padding-top: 10px;
    color: #F4C867;
    font-weight: 500;
    font-family: STXingkai;
    font-size: 30px;
    margin: auto
}

.input {
    position: absolute;
    height: 50px;
    width: 280px;
    top: 35px;
    left: 65px;
}

.button {
    font-size: 30px;
    font-family: LiSu;
}

.search {

    height: 100px;
    padding-left: 50px;
    width: 35vw;
}

.view {

    width: 70vw;
    height: 58vh;
}

.hot {
    width: 200px;
    height: 140px;
    margin-left: 50px;
}

.text {
    padding-top: 10px;
    color: #F4C867;
    font-weight: 500;
    font-family: STXingkai;
    font-size: 20px;
}

.text_1 {
    padding-top: 10px;
    color: #F4C867;
    font-weight: 500;
    font-family: STXingkai;
    font-size: 30px;
    margin-top: 30px;
}

.img {
    border: 5px groove #F4C867;
    height: 100px;
    width: 200px
}
</style>