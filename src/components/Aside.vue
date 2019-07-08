<template>
  <div class="app">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1" @click="homePage">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="2"  @click="published">
        <i class="el-icon-position"></i>
        <span slot="title">已发布</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-s-data"></i>
        <span slot="title">统计</span>
      </el-menu-item>
      <el-menu-item index="4" @click="publish_article">
        <i class="el-icon-tickets"></i>
        <span slot="title">发表文章</span>
      </el-menu-item>
      <el-menu-item index="5" @click="label_page">
        <i class="el-icon-collection-tag"></i>
        <span slot="title">标签页</span>
      </el-menu-item>
      <el-menu-item index="6"  @click="export_excel">
        <i class="el-icon-sold-out"></i>
        <span slot="title">导出excel</span>
      </el-menu-item>
      <el-menu-item index="7" @click="picture_upload">
        <i class="el-icon-connection"></i>
        <span slot="title">图片上传</span>
      </el-menu-item>
      <el-menu-item index="8" @click="exitsystem">
        <i class="el-icon-switch-button"></i>
        <span slot="title">退出系统</span>
      </el-menu-item>
    </el-menu>
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <span>你确定要退出系统吗？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="determine">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Aside",
  components: {},
  props: {},
  data() {
    return {
      centerDialogVisible: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    homePage () {
      this.$router.push({name: "home"})
    },
    published () {
      this.$router.push({name: "published"})
    },
    export_excel () {
      this.$router.push({name:"export"})
    },
    picture_upload () {
      this.$router.push({name: "picture"})
    },
    label_page () {
      this.$router.push({name: "label"})
    },
    exitsystem () {
       this.centerDialogVisible = !this.centerDialogVisible
    },
    determine () {
      this.$router.push({name: "login"})
      this.centerDialogVisible = false
      localStorage.removeItem("user")
    },
    publish_article () {
      this.$router.push({name: "publish"})
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

<style scoped lang="scss">
  .el-menu-vertical-demo {
    width: 180px;
    height: 800px;
    position: fixed;
    left: 0;
    top: 60px;
  }
</style>
