<template>
  <div id="app">
    <router-view v-if="$route.path ==='/' || $route.path === '/register'"></router-view>
    <el-container v-else>
      <el-header style="padding: 0"><Header></Header></el-header>
      <el-container>
        <el-aside width="180px"><Aside></Aside></el-aside>
        <el-main> <router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Aside from "./components/Aside";
import Header from "./components/Header";
export default {
  name: "App",
  components: {
    Aside,
    Header
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
  @import "style/common";
</style>
