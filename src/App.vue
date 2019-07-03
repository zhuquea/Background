<template>
  <div id="app">
    <el-container>
      <el-header><Header></Header></el-header>
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
</style>
