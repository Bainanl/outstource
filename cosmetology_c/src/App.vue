<template>
  <router-view />
</template>

<style lang="css">
body,
html {
  margin: 0;
  padding: 0;
}

.flex-float {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex {
  display: flex;
  align-items: center;
}

.flex-col {
  display: flex;
  flex-direction: column;
}

.items-center {
  display: flex;
  align-items: center;
}

.justify-center {
  display: flex;
  justify-content: center;
}

.page_content {
  display: block;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  margin-top: 30px;
}
</style>
