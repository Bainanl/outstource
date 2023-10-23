<template>
    <div>
        <div class="flex-row">
            <div class="block text-center">
                <el-carousel height="44vh">
                    <el-carousel-item>
                        <el-image :src="require('../assets/image/swiper(1).png')"></el-image>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="flex-row" style="height:300px;flex-wrap:wrap;width:500px;margin-top:100px">
                <div class="hot flex-col" style="margin-left:25px" v-for="item in img_1" :key="item.value">
                    <el-image :src="item.src" style="height:100px;width:200px" fit="fill" class="img" />
                    <span class="text">{{ item.name }}</span>
                </div>
            </div>
        </div>

        <div class="flex-row" style="margin-left:80px">
            <div class="hot flex-col" v-for="item in img_2" :key="item.value">
                <el-image :src="item.src" style="height:100px;width:200px" fit="fill" class="img" />
                <span class="text">{{ item.name }}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
export default {
    setup() {
        let data = reactive({
            img_1: [{
                value: 0,
                src: require('../assets/image/sucai/sucai_1.png'),
                name: '花鸟纹'
            },
            {
                value: 1,
                src: require('../assets/image/sucai/sucai_2.png'),
                name: '凤纹'
            },
            {
                value: 2,
                src: require('../assets/image/sucai/sucai_9.png'),
                name: '荷花纹'
            },
            {
                value: 3,
                src: require('../assets/image/sucai/sucai_5.png'),
                name: '夔龙纹'
            }],
            img_2: [{
                value: 0,
                src: require('../assets/image/ku/ku_1.png'),
                name: '五伦图绣品纹样'
            },
            {
                value: 1,
                src: require('../assets/image/ku/ku_10.png'),
                name: '朵花团窠对鹿纹样'
            },
            {
                value: 2,
                src: require('../assets/image/ku/ku_11.png'),
                name: '朵花团窠对雁纹样'
            },
            {
                value: 3,
                src: require('../assets/image/ku/ku_12.png'),
                name: '蝴蝶团花飞鸟纹样'
            }]
        })
        return {
            ...toRefs(data)
        }
    }
}
</script>
<style scoped>
.block {
    width: 35vw;
    padding-left: 20px;
    padding-top: 30px;
}

.img {
    border: 5px groove #F4C867;
}

.demonstration {
    color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
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
</style>