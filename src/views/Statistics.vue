<template>
  <div>
    <div class="statistics__first">
      <div class="first__dv1">
        今日发布 <span class="dv1__span1"><i class="el-icon-check"></i></span>
        <div>{{ todayreleased }}</div>
      </div>
      <div class="first__dv2">
        原创文章 <span class="dv2__span2"><i class="el-icon-tickets"></i></span>
        <div>{{ original }}</div>
      </div>
      <div class="first__dv3">
        新留言 <span class="dv3__span3"><i class="el-icon-message"></i></span>
        <div>0</div>
      </div>
      <div class="first__dv4">
        新消息
        <span class="dv4__span4"><i class="el-icon-chat-dot-square"></i></span>
        <div>0</div>
      </div>
    </div>
    <div class="statistics__second">
      <el-card class="box-card1">
        <ve-pie :data="chartData1"></ve-pie>
      </el-card>
      <el-card class="box-card2">
        <ve-ring :data="chartData2" :settings="chartSettings"></ve-ring>
      </el-card>
    </div>
    <div class="statistics__third">
      <el-card class="box-card">
        <ve-waterfall :data="chartData3"></ve-waterfall>
      </el-card>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "Statistics",
  components: {},
  props: {},
  data() {
    this.chartSettings = {
      roseType: "radius"
    };
    return {
      statisticsData: {},
      todayreleased: 0,
      original: 0,
      chartData1: {
        columns: ["category", "num"],
        rows: []
      },
      arrAray: [],
      arrAray2: [],
      arrAray3: [],
      chartData2: {
        columns: ["source", "num"],
        rows: []
      },
      chartData3: {
        columns: ["date", "num"],
        rows: []
      }
    };
  },
  methods: {
    getarticle() {
      this.$axios
        .req("api/article/allArticle")
        .then(response => {
          if (response) {
            this.statisticsData = response.data;
            let num1 = 0;
            let num2 = 0;
            this.statisticsData.map(item => {
              if (
                this.$moment(item.date).date() ===
                this.$moment(new Date()).date()
              ) {
                num1++;
              }
              if (item.source === "original") {
                num2++;
              }
            });
            this.todayreleased = num1;
            this.original = num2;
            this.arrAray = _.groupBy(response.data, "category");
            let arrArr1 = [];
            let arrArr2 = [];
            console.log(this.arrAray);
            for (let key in this.arrAray) {
              arrArr1.push(key);
              arrArr2.push(this.arrAray[key]);
            }
            for (let i = 0; i < arrArr1.length; i++) {
              this.chartData1.rows.push({
                category: arrArr1[i],
                num: arrArr2[i].length
              });
            }
            this.arrAray2 = _.groupBy(response.data, "source");
            let arrArr3 = [];
            let arrArr4 = [];
            for (let key in this.arrAray2) {
              arrArr3.push(key);
              arrArr4.push(this.arrAray2[key]);
            }
            for (let j = 0; j < arrArr3.length; j++) {
              this.chartData2.rows.push({
                source: arrArr3[j],
                num: arrArr4[j].length
              });
            }
            this.arrAray3 = _.groupBy(response.data, "date");
            let arrArr5 = [];
            let arrArr6 = [];
            console.log(this.arrAray3);
            for (let key in this.arrAray3) {
              arrArr5.push(key);
              arrArr6.push(this.arrAray3[key]);
            }
            console.log(arrArr5);
            for (let k = 0; k < arrArr5.length; k++) {
              this.chartData3.rows.push({
                date: this.$moment(arrArr5[k]).format("YYYY年MM月DD日"),
                num: arrArr6[k].length
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getarticle();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.statistics__first {
  display: flex;
  justify-content: flex-start;
}
.statistics__first > div {
  text-align: center;
  height: 60px;
  line-height: 30px;
  font-size: 20px;
  flex: 1;
}
.first__dv1 {
  background-color: darkturquoise;
  position: relative;
}
.first__dv2 {
  background-color: pink;
  position: relative;
}
.first__dv3 {
  background-color: chocolate;
  position: relative;
}
.first__dv4 {
  background-color: cornflowerblue;
  position: relative;
}
.dv1__span1 {
  position: absolute;
  top: 15px;
  right: 30px;
}
.dv2__span2 {
  position: absolute;
  top: 15px;
  right: 30px;
}
.dv3__span3 {
  position: absolute;
  top: 15px;
  right: 30px;
}
.dv4__span4 {
  position: absolute;
  top: 15px;
  right: 30px;
}
.statistics__second {
  display: flex;
  margin-top: 10px;
}
.box-card1,
.box-card2 {
  flex: 1;
}
</style>
