<template>
  <div>
    <div class="label__first">
      <span @click="unread">未读消息（{{ arrlabel1.length }}）</span>
      <span @click="readEd">已读消息（{{ arrlabel2.length }}）</span>
      <span @click="recovery">回收站（{{ arrlabel3.length }}）</span>
    </div>
    <div class="label__second">
      <el-table :data="arrlabel" style="width: 100%">
        <el-table-column prop="name" width="1080"></el-table-column>
        <el-table-column prop="time" width="160"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" @click="readed(scope)" v-if="showbtn1"
              >标为已读</el-button
            >
            <el-button
              size="mini"
              type="danger"
              v-else-if="showbtn2"
              @click="deleted(scope)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="warning"
              v-else-if="showbtn3"
              @click="reductioned(scope)"
              >还原</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        style="margin-top: 20px"
        v-if="showbtn1"
        @click="readedall"
        >全部标为已读</el-button
      >
      <el-button type="danger" v-else-if="showbtn2" @click="deleteall"
        >删除全部</el-button
      >
      <el-button type="info" v-else-if="showbtn3" @click="reductionedall"
        >清空回收站</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Label_page",
  components: {},
  props: {},
  data() {
    return {
      showbtn1: true,
      showbtn2: false,
      showbtn3: false,
      arrlabel: [
        {
          name: "【系统通知】该系统将于今晚凌晨2点到5点进行系统维护",
          time: "2018-04-09 20:00:00"
        },
        {
          name: "今晚12点整发大红包，先到先得",
          time: "2018-04-09 21:00:00"
        }
      ],
      arrlabel1: [
        {
          name: "【系统通知】该系统将于今晚凌晨2点到5点进行系统维护",
          time: "2018-04-09 20:00:00"
        },
        {
          name: "今晚12点整发大红包，先到先得",
          time: "2018-04-09 21:00:00"
        }
      ],
      arrlabel2: [],
      arrlabel3: [],
      arrempty: []
    };
  },
  methods: {
    unread() {
      this.arrlabel = this.arrlabel1;
      this.showbtn1 = true;
      this.showbtn2 = false;
      this.showbtn3 = false;
    },
    readEd() {
      this.arrlabel = this.arrlabel2;
      this.showbtn1 = false;
      this.showbtn2 = true;
      this.showbtn3 = false;
    },
    recovery() {
      this.arrlabel = this.arrlabel3;
      this.showbtn1 = false;
      this.showbtn2 = false;
      this.showbtn3 = true;
    },
    readed(scope) {
      this.arrlabel.splice(scope.$index, 1);
      this.arrlabel1.splice(scope.$index, 1);
      this.arrlabel2.push(scope.row);
    },
    deleted(scope) {
      this.arrlabel2.splice(scope.$index, 1);
      this.arrlabel3.push(scope.row);
    },
    reductioned(scope) {
      this.arrlabel3.splice(scope.$index, 1);
      this.arrlabel2.push(scope.row);
    },
    readedall() {
      this.arrlabel = [];
      this.arrlabel1.forEach(item => {
        this.arrlabel2.push(item);
      });
      this.arrlabel1 = [];
    },
    deleteall() {
      this.arrlabel = [];
      this.arrlabel2.forEach(item => {
        this.arrlabel3.push(item);
      });
      this.arrlabel2 = [];
    },
    reductionedall() {
      this.arrlabel = [];
      this.arrlabel3 = [];
    }
  },
  mounted() {
    this.arrempty = this.arrlabel;
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.label__first > span {
  display: inline-block;
  height: 30px;
  text-align: center;
  margin-left: 20px;
  cursor: pointer;
}
.label__first > span:hover {
  color: darkturquoise;
  border-bottom: 1px solid darkturquoise;
}
.label__second {
  margin-top: 20px;
}
</style>
