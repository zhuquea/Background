<template>
  <div class="header__app">
     <div class="header__dv1">
       欢迎{{username}}来到小爱后台系统
     </div>
    <div class="header__dv2">
      <span v-if="timenow >= 6 && timenow<12">早上好</span>
        <span v-else-if="timenow>=12 && timenow<14">中午好</span>
        <span v-else-if="timenow>=14 && timenow<18">下午好</span>
        <span v-else-if="timenow>=18 && timenow<24">晚上好</span>
        <span v-else>太晚了，该睡觉了</span>
        {{username}}，本次登录时间为：{{logintime}}
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  components: {},
  props: {},
  data() {
    return {
        username: "",
        date: "",
        year: "",
        month: "",
        date0: "",
        date1: "",
        date2: "",
        date3: "",
        logintime: "",
        timenow: ""
    };
  },
  methods: {},
  mounted() {
      this.username = JSON.parse(localStorage.getItem("user"))[0].username
      this.date = JSON.parse(localStorage.getItem("user"))[0].date
      this.year = this.$moment(this.date).year()
      this.month = this.$moment(this.date).month()
      this.date0 = this.$moment(this.date).date()
      this.date1 = this.$moment(this.date).hour()
      this.date2 = this.$moment(this.date).minute()
      this.date3 = this.$moment(this.date).second()
      // this.logintime = this.year + "年" + this.month + "月" + this.date0 + "日" + this.date1 + "时" +this.date2 + "分" + this.date3 + "秒"
    this.logintime = localStorage.getItem("timer")
      this.timenow = this.$moment(new Date()).hour()
  },
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
    z-index: 2000;
  }
  .header__dv1 {
padding-left: 50px;
  }
  .header__dv2 {
    padding-right: 70px;
  }
</style>
