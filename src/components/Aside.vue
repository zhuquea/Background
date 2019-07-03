<template>
  <div class="app">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-position"></i>
        <span slot="title">已发布</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-s-data"></i>
        <span slot="title">统计</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-tickets"></i>
        <span slot="title">发表文章</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-collection-tag"></i>
        <span slot="title">标签页</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-sold-out"></i>
        <span slot="title">导出excel</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-connection"></i>
        <span slot="title">图片上传</span>
      </el-menu-item>
      <el-menu-item index="8">
        <i class="el-icon-switch-button"></i>
        <span slot="title">退出系统</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss"></style>
