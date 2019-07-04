<template>
  <div class="header__app">
     <div class="header__dv1">
       欢迎来到小爱后台系统
     </div>
    <div class="header__dv2">
      早上好，上次登录时间
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
  .header__app {
    width: 1600px;
    height: 60px;
    background-color: #00B7FF;
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1000;
  }
  .header__dv1 {
padding-left: 50px;
  }
  .header__dv2 {
    padding-right: 70px;
  }
</style>
