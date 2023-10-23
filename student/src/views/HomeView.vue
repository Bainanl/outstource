<template>
  <div class="container">
    <div class="header">
      <span><router-link to="/shouye">首页</router-link></span>
      <span><router-link to="/jishi">素材集市</router-link></span>
      <span><router-link to="ku">图案纹样库</router-link></span>
      <span><router-link to="dingzhi">绘图定制</router-link></span>
      <span><router-link to="hezuo">合作计划</router-link></span>
    </div>
    <div class="show">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',

}
</script>

<style>
.router-link-active {
  text-decoration: none;
  color: #89AAD9;
}

a {
  text-decoration: none;
  color: #F4C867;
}

body,
html {
  margin: 0;
  padding: 0
}


.container {
  width: 100vw;
  height: 100vh;
  background-image: url(../assets/image/333.png);
}

.header {
  width: 50vw;
  height: 9vh;
  position: fixed;
  margin-top: 40px;
  margin-left: 220px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.header span {
  height: 5vh;
  display: block;
  font-size: 30px;
  font-family: LiSu;
  color: #FAC03D;
}

.show {
  position: absolute;
  width: 70vw;
  height: 70vh;
  top: 50%;
  left: 50%;
  margin-left: -35vw;
  margin-top: -35vh;
}
</style>