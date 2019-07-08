<template>
  <div class="Home__home">
    <div class="home__first">
      <div class="home__first__dv">
        <img src="../picture/用户.svg" alt="" class="home__first_img" />
        <span class="home__first_span1">New Visits</span>
        <span class="home__first_span2">
          <countTo
            :startVal="startVal"
            :endVal="homeData.visits"
            :duration="3000"
          ></countTo>
        </span>
      </div>
      <div class="home__first__dv">
        <img src="../picture/信息.svg" alt="" class="home__first_img" />
        <span class="home__first_span1">Messages</span>
        <span class="home__first_span2">
          <countTo
            :startVal="startVal"
            :endVal="homeData.messages"
            :duration="3000"
          ></countTo>
        </span>
      </div>
      <div class="home__first__dv">
        <img src="../picture/金钱.svg" alt="" class="home__first_img" />
        <span class="home__first_span1">Purchases</span>
        <span class="home__first_span2">
          <countTo
            :startVal="startVal"
            :endVal="homeData.purchases"
            :duration="3000"
          ></countTo>
        </span>
      </div>
      <div class="home__first__dv">
        <img src="../picture/购物车空.svg" alt="" class="home__first_img" />
        <span class="home__first_span1">Shoppings</span>
        <span class="home__first_span2">
          <countTo
            :startVal="startVal"
            :endVal="homeData.shopping"
            :duration="3000"
          ></countTo>
        </span>
      </div>
    </div>
    <div class="home__second">
      <ve-line :data="chartData1"></ve-line>
    </div>
    <div class="home__third">
      <el-card class="home__third__dv1"
        ><ve-radar :data="chartData2"></ve-radar
      ></el-card>
      <el-card class="home__third__dv2">
        <ve-pie :data="chartData3" :settings="chartSettings3"></ve-pie
      ></el-card>
      <el-card class="home__third__dv3"
        ><ve-histogram :data="chartData4"></ve-histogram
      ></el-card>
    </div>
    <div class="home__fourth">
      <div class="home__fourth__dv1">
        <el-table :data="orderData" style="width: 100%" v-if="orderData.length > 0">
          <el-table-column prop="num" label="Order_No" width="380" column-key="num" header-align="center" align="center">
          </el-table-column>
          <el-table-column prop="price" label="Price" width="280" header-align="center" align="center">
            <template slot-scope="scope">
              ￥{{ scope.row.price }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="Status" width="100" header-align="center" align="center">
            <template slot-scope="scope">
              <el-tag type="success" disable-transitions v-if="scope.row.status === 1">success</el-tag>
              <el-tag type="danger" disable-transitions v-else>pending</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="home__fourth__dv2">
        <el-card>
          <div>
            <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png" alt="图片"/>
          </div>
          <div v-if="progress.length > 0" class="fourth__dv2__progressbar">
            <div v-for="(item, index) in progress" :key="index">
              {{ item.name }}
              <el-progress :percentage="item.progress * 100" status="success" v-if="item.progress === 1"></el-progress>
              <el-progress :percentage="item.progress * 100" v-else></el-progress>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";
export default {
  name: "Home",
  components: {
    countTo
  },
  props: {},
  data() {
    this.chartSettings3 = {
      roseType: "radius"
    };
    return {
      startVal: 0,
      homeData: {},
      chartData1: {
        columns: ["date", "expected", "actual"],
        rows: []
      },
      chartData2: {
        columns: [
          "name",
          "delelopmer",
          "marketing",
          "ministration",
          "sales",
          "techology"
        ],
        rows: []
      },
      chartData3: {
        columns: ["name", "data"],
        rows: []
      },
      chartData4: {
        columns: ["date", "expected", "actual"],
        rows: []
      },
      orderData: {},
      progress: []
    };
  },
  methods: {
    getDataHome1() {
      this.$axios
        .req("api/homeData")
        .then(response => {
          if (response) {
            this.homeData = response.data;
            // console.log(this.homeData);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataHome2() {
      this.$axios
        .req("api/homeChat")
        .then(response => {
          if (response) {
            this.chartData1.rows = response.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataHome3() {
      this.$axios
        .req("api/radarChat")
        .then(response => {
          if (response) {
            this.chartData2.rows = response.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataHome4() {
      this.$axios
        .req("api/ringChat")
        .then(response => {
          if (response) {
            this.chartData3.rows = response.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataHome5() {
      this.$axios
        .req("api/homeChat")
        .then(response => {
          if (response) {
            this.chartData4.rows = response.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataHome6() {
      this.$axios
        .req("api/orderData")
        .then(response => {
          if (response) {
            this.orderData = response.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDataHome7() {
      this.$axios
        .req("api/progress")
        .then(response => {
          if (response) {
            this.progress = response.data;
            // console.log(this.progress);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getDataHome1();
    this.getDataHome2();
    this.getDataHome3();
    this.getDataHome4();
    this.getDataHome5();
    this.getDataHome6();
    this.getDataHome7();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.home__first {
  display: flex;
}
.home__first__dv {
  width: 320px;
  height: 100px;
  border: 0px solid darkgrey;
  margin-left: 15px;
  position: relative;
  box-shadow: 5px 5px 4px 2px rgba(0, 0, 0, 0.2);
}
.home__first_img {
  height: 70px;
  position: absolute;
  top: 14px;
  left: 30px;
}
.home__first_span1 {
  position: absolute;
  top: 20px;
  right: 10px;
  font-size: 20px;
}
.home__first_span2 {
  position: absolute;
  top: 60px;
  right: 10px;
  font-size: 20px;
}
.home__second {
  margin-top: 20px;
}
.home__third {
  display: flex;
}
.home__third__dv1 {
  margin-left: 10px;
  flex: 1;
}
.home__third__dv2 {
  flex: 1;
  margin-left: 10px;
}
.home__third__dv3 {
  flex: 1;
  margin-left: 10px;
}
.home__fourth {
  display: flex;
}
.home__fourth__dv1 {
  flex: 2;
}
.home__fourth__dv2 {
  flex: 1;
}
.fourth__dv2__progressbar {
  margin-top: 65px;
}
</style>
