<template>
    <div>
        <div class="input">
            <input v-model="input" placeholder="Please input"
                style="border:0; background-color: #ae3628;height:29px;width: 268px;" />
        </div>
        <div class="search flex-row items-center">
            <img src="../assets/image/search_1(1).png" alt="" style="height:50px;">
            <el-button type="success" plain text color="#F4C867" size="large" class="button" @click="search">搜索</el-button>
            <div class="menu flex-row items-center justify-around">
                <el-dropdown>
                    <el-button color="#4169E1" size="large">
                        <span>载体</span><span style="margin-left: 10px;margin-top:5px">﹀</span> </el-button>
                    <template #dropdown>
                        <el-dropdown-menu v-for="item in carrier" :key="item.value">
                            <el-dropdown-item @click="handleCommand(item.text)">{{ item.text }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-dropdown>
                    <el-button color="#4169E1" size="large">
                        <span>年代</span><span style="margin-left: 10px;margin-top:5px">﹀</span> </el-button>
                    <template #dropdown>
                        <el-dropdown-menu v-for="item in time" :key="item.value">
                            <el-dropdown-item @click="handleCommand(item.text)">{{ item.text }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <div class="view flex-row" style="flex-wrap:wrap;">
            <div class="flex-col" style="margin-left:50px;margin-top:5px" v-for="item in img" :key="item.value"
                v-show="item.show" @click="detail(item.value)">
                <el-image :src="item.src" :fit="fit" :class="showIntroduce == true ? 'img_2' : 'img'" />
                <span :class="showIntroduce == true ? 'text_2' : 'text'">{{ item.name }}</span>
            </div>
            <div v-if="showIntroduce" class="introduce">{{ introduce }}</div>
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
                src: require("../assets/image/ku/ku_1.png"),
                name: "五伦图绣品纹样",
                show: true,
                keyword: "明清(清代刺绣)",
                introduce: "图案纹样介绍：《孟子滕文公》：“君臣、父子、夫妇、长幼、朋友。父子有亲，君臣有义，夫妇有别，长幼有序，朋友有信。”五伦即五常，也就是中国传统文化中儒家所提倡的君臣、父子、夫妇、长幼、朋友之间的关系，后人画花鸟，以凤凰、仙鹤、鸳鸯、鶺鴒、黄莺作五伦图。五伦图中，以凤表示君臣之道，仙鹤喻父子，鸳鸯表示夫妇之道，鶺鴒喻兄弟友爱之情，黄莺表示朋友之道，花卉以玉兰、紫藤、牡丹等寓意富贵吉祥。"
            }, {
                value: 1,
                src: require("../assets/image/ku/ku_2.png"),
                name: "瑞兽戏花刺绣纹样",
                show: true,
                keyword: "明清(清代刺绣)",
                introduce: "图案纹样介绍：造型奇特多样，表情夸张怪异，以瑞兽为表现题材的绣品在桃源刺绣中最具特色。瑞兽中常见有狮子、獾、狸、兔、猴、独角兽，以及不知其名的怪兽等，它们常与造型圆阔细长的绿叶和红花等组合在一起，生趣盎然。帐檐中的瑞兽以“瞠目阔口，獠牙外露”为特征，是桃源刺绣中的特有造型，被认为是沅水流域悠久的巫傩文化遗存。"
            }, {
                value: 2,
                src: require("../assets/image/ku/ku_3.png"),
                name: "“双狮戏球”刺绣纹样",
                show: true,
                keyword: "明清(清代刺绣)",
                introduce: "图案纹样来源：桃源刺绣的构图中，多将日常生活中常见的一些小昆虫如蜜蜂、蜘蛛、蝉、蟋蟀、蝴蝶等点缀于画面。帐檐为白缎地，以民众喜闻乐见的“双狮戏球”为表现题材，在绣品的中心位置从上至下悬挂着一只吐丝蜘蛛，谐音“喜从天降”，寓意吉祥，反映出桃源民众对美好生活的热爱。"
            }, {
                value: 3,
                src: require("../assets/image/ku/ku_4.png"),
                name: "贵州苗族刺绣龙纹样",
                show: true,
                keyword: "近现代刺绣",
                introduce: "图案纹样介绍：来源于苗族农耕文化和鱼文化的哲学观念。苗绣中龙的形象较之汉族的龙更为丰富多彩，有牛龙、鱼龙、蚕龙、鸟龙、蛇龙等多种。这些龙多为各种动物的结合体，有鱼身牛角龙，人首鱼身龙，等等。在苗族民间信仰中，龙有普龙、恶龙之分，有山龙、水龙之别。因此，修房建屋，选择地基要祭祀山龙；水龙主管风调南顺，析求家庭平安、善龙可以保家护寨：恶龙则兴风作浪，造成灾祸。苗族的龙可以转化善恶，当大们触犯或任意动土伤龙，龙就会不安宁，就会兴妖降灾；龙又与大相亲相近，不如汉族龙那样凶猛、威严、神圣不可侵犯,而是形态丰富，憨态可爱，平易近人。"
            }, {
                value: 4,
                src: require("../assets/image/ku/ku_5.png"),
                name: "苗族蝴蝶刺绣纹样",
                show: true,
                keyword: "近现代刺绣",
                introduce: "图案纹样来源：蝴蝶花纹是中国苗族人在服饰上绣制的富有民族特色的纹样。苗族人对蝴蝶花纹的喜爱，缘于古代的图腾崇拜。苗族的先民古代本来居住在江淮一带，那里江湖密布，河道纵横，而且枫木遍生，彩蝶飞舞。在这种环境下，出于那种原始的心理，先民们对繁盛的枫木和彩蝶产生了求同认亲和崇拜的意识。在苗族的服饰中，蝴蝶双飞的美丽花纹极为常见。"
            }, {
                value: 5,
                src: require("../assets/image/ku/ku_6.png"),
                name: "清盘长纹四合如意云肩纹样",
                show: true,
                keyword: "明清(清代云肩)",
                introduce: "图案纹样来源：云肩采用四合如意样式，四合如意中的云纹为如意形状，四合则取东南西北四方祥和如意之寓意。云肩用24枚如意云头纹组成，分别用不同颜色的绸缎配色，如意云头上面平绣吉祥花卉，用盘长纹衔接其间。色彩浓郁，造型丰满。"
            }, {
                value: 6,
                src: require("../assets/image/ku/ku_7.png"),
                name: "青花缠枝牡丹纹",
                show: true,
                keyword: "元代瓷器",
                introduce: "图案纹样介绍：一圈缠枝牡丹纹饰，周身绘满缠枝牡丹青花图案，紧接着是一条较窄的卷草边饰。胫部装饰有卷草纹及仰莲如意纹一周。纹饰带有宽有窄，其间以弦纹相隔，青花构图严谨，层次分明，主题突出，浑然一体，显得繁而不乱。笔意深沉有力，青色艳丽之中又带古朴，风格生动豪放。"
            }, {
                value: 7,
                src: require("../assets/image/ku/ku_8.png"),
                name: "革家蜡染纹样",
                show: true,
                keyword: "近现代蜡染",
                introduce: "图案纹样来源：革家蜡染起源于古时革家男人上山打猎，被蜂液滴在身上,回家后衣服上的蜂液与花草混合的颜色清洗不掉，发现蜂蜡是衣服最好的保护色，因此革家人发明了用蜂蜡画图（蜡染）的技艺。革家妇女用蜡染做成衣裙，配以红缨帽、披肩，即马甲、围腰、红绑腿、银饰，便形成了革家妇女的盛装。革家蜡染技艺重在意识的表达，记载着革家历史征战、民族迁徙等文化，革家蜡染中的每个图案和纹样都有着深刻的内涵。蜡染图案的寓意和观念，培育着革家族人的人生观、价值观，对大自然的热爱情怀，对民族兴盛传承的热烈情感，体现了革家的民族性格含义和艺术气质。"
            }, {
                value: 8,
                src: require("../assets/image/ku/ku_9.png"),
                name: "苗族传统蜡染纹样",
                show: true,
                keyword: "近现代蜡染",
                introduce: "图案纹样来源：苗族蜡染的起源，可追溯到2000多年前秦汉时期称之为“蜡缬”。关于蜡染起源的说法繁多。有一说：苗族姑娘心念染织出美丽的花纹于衣物却一时无获，闷闷不乐，昏沉中，一花仙引她入了百花园，园中百花似锦，鱼鸟相谐。姑娘观得入神不知蜜蜂爬满衣裙，惊醒后发现衣裙确有蜂蜡的斑迹，遂将衣裙重新染色，意去除蜂蜡，却发现蜂蜡脱落处留下美丽白花姑娘欣喜异常，将百花园中所遇唱予歌声中，招来众伙观摩学习，并将蜡染技法沿袭至今。乐观的苗族人以无数珍奇鱼鸟虫兽加入纹样，将对美好生活的向往和对先祖故乡的缅怀融入到蜡染工艺中，从而演变出变化无穷，生动形象的蜡画纹样与图腾。"
            }, {
                value: 9,
                src: require("../assets/image/ku/ku_10.png"),
                name: "朵花团窠对鹿纹样",
                show: true,
                keyword: "明清(唐代)",
                introduce: "图案纹样来源：“花树对鹿”这一主题的纹样带有鲜明的中亚、西亚风格。尤其是鹿的大角和鹿项系的绶带。中、晚唐后鹿角随意，项上无绶带的本土化特征逐渐明显，此夹缬上的“鹿”明显为具有东方风格的梅花鹿。"
            }, {
                value: 10,
                src: require("../assets/image/ku/ku_11.png"),
                name: "朵花团窠对雁纹样",
                show: true,
                keyword: "唐代",
                introduce: "图案纹样来源：花鸟纹是唐代染织纹样的主体。四对大雁围绕四瓣花，与联珠组合成团窠主体纹样，四周辅以十字形花纹。整体纹样绚丽热烈，正是一派“花舞大唐春”的华美景象。"
            }, {
                value: 11,
                src: require("../assets/image/ku/ku_12.png"),
                name: "蝴蝶团花飞鸟纹样",
                show: true,
                keyword: "唐代",
                introduce: "图案纹样来源：唐代花鸟纹样形式逐渐多样，晚唐至五代还出现了“喜相逢”样式，即两禽鸟回环对飞，首尾相接的形式。此纹样便以“喜相逢”禽鸟为中心，周围环绕枝叶花卉，团窠之间为展翅而飞的蝴蝶。"
            },
            ],
            carrier: [{
                text: "全部",
                value: "0"
            }, {
                text: "瓷器",
                value: 1
            }, {
                text: "青铜器",
                value: 2
            }, {
                text: "珐琅",
                value: 3
            }, {
                text: "织锦",
                value: 4
            }, {
                text: "刺绣",
                value: 5
            }, {
                text: "蜡染",
                value: 6
            }, {
                text: "地毯",
                value: 7
            }],
            time: [{
                text: "全部",
                value: "0",
            }, {
                text: "商朝",
                value: "1"
            }, {
                text: "春秋战国",
                value: 2
            }, {
                text: "秦朝",
                value: 3
            }, {
                text: "汉代",
                value: 4
            }, {
                text: "唐宋",
                value: 5
            }, {
                text: "元代",
                value: 6
            }, {
                text: "明清",
                value: 7
            }, {
                text: "近现代",
                value: 8
            }],
            input: "",
            introduce: "",
            showIntroduce: false,
            fit: "fill"
        });
        const search = () => {
            console.log(data.input);
            for (let i = 0; i < data.img.length; i++) {
                if (data.img[i].name.includes(data.input)) {
                    data.img[i].show = true;
                    data.showIntroduce = false;
                    data.fit = "fill";
                }
                else {
                    data.img[i].show = false;
                    data.showIntroduce = false;
                    data.fit = "fill";
                }
            }
        };
        const handleCommand = (command) => {
            for (let i = 0; i < data.img.length; i++) {
                if (command == "全部") {
                    data.img[i].show = true;
                    data.showIntroduce = false;
                    data.fit = "fill";
                }
                else {
                    if (data.img[i].keyword.includes(command)) {
                        data.img[i].show = true;
                        data.showIntroduce = false;
                        data.fit = "fill";
                    }
                    else {
                        data.img[i].show = false;
                        data.showIntroduce = false;
                        data.fit = "fill";
                    }
                }
            }
        };
        const detail = (value) => {
            console.log(value);
            for (let i = 0; i < data.img.length; i++) {
                if (data.img[i].value != value) {
                    data.img[i].show = false;
                }
                else {
                    data.img[i].show = true;
                    data.showIntroduce = true;
                    data.introduce = data.img[value].introduce;
                    data.fit = "scale-down";
                }
            }
            console.log(data.img[value].show);
        };
        return {
            ...toRefs(data),
            search,
            handleCommand,
            detail
        };
    },
}
</script>
<style scoped>
.introduce {
    width: 35vw;
    margin-left: 2vw;
    margin-top: 2vh;
    font-size: 25px;
    font-family: STXingkai;
}

.menu {
    height: 100px;
    width: 350px;
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
    width: 70vw;
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
    font-size: 16px;
}

.img {
    border: 5px groove #F4C867;
    height: 100px;
    width: 200px
}

.img_2 {
    width: 20vw
}

.text_2 {
    padding-top: 10px;
    color: #F4C867;
    font-weight: 500;
    font-family: STXingkai;
    font-size: 25px;
}
</style>