<template>
  <div class="container">
    <div class="header">
      <span>首页</span>
      <span>素材集市</span>
      <span>图案纹样库</span>
      <span>绘图定制</span>
      <span>合作计划</span>
      <router-link to="/home">首页</router-link>
    </div>
    <div class="show">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
body,
html {
  margin: 0;
  padding: 0
}


.container {
  width: 100vw;
  background-image: url(./assets/image/333.png);
  height: 100vh;

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
