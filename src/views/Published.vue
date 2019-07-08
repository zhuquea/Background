<template>
  <div>
  <div v-if="articledata.length > 0">
    <el-table
      ref="singleTable"
      :data="
        articledata.slice(pagesize * (currentPage - 1), pagesize * currentPage)
      "
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column
        property="title"
        label="标题"
        width="320"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <el-table-column
        property="author"
        label="作者"
        width="120"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="category" label="类目" width="120">
        <template slot-scope="scope">
          <el-tag
            type="success"
            disable-transitions
            v-if="scope.row.category === 'vue'"
            >Vue</el-tag
          >
          <el-tag
            type="warning"
            disable-transitions
            v-else-if="scope.row.category === 'javascript'"
            >JavaScript</el-tag
          >
          <el-tag
            type="info"
            disable-transitions
            v-else-if="scope.row.category === 'react'"
            >React</el-tag
          >
          <el-tag
            type="danger"
            disable-transitions
            v-else-if="scope.row.category === 'tool'"
            >工具类</el-tag
          >
          <el-tag
            type="primary"
            disable-transitions
            v-else-if="scope.row.category === 'other'"
            >其他</el-tag
          >
          <el-tag
            type="warning"
            disable-transitions
            v-else-if="scope.row.category === 'procedures'"
            >小程序</el-tag
          >
          <el-tag
            disable-transitions
            v-else-if="scope.row.category === 'performance'"
            round
            >性能优化</el-tag
          >
          <el-tag
            type="success"
            disable-transitions
            v-else-if="scope.row.category === 'nodejs'"
            round
            >Node.js</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        property="source"
        label="来源"
        width="150"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.source === 'reprint'">转载</span>
          <span v-else-if="scope.row.source === 'original'">原创</span>
          <span v-else>与他人合作</span>
        </template>
      </el-table-column>
      <el-table-column
        property="star"
        label="重要性"
        width="150"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <el-rate
            :value=' parseInt(scope.row.star)'
            disabled
            text-color="#ff9900"
          >
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column property="date" label="发布时间" width="150" header-align="center" align="center">
        <template slot-scope="scope">
          {{scope.row.timeT}}
        </template>
      </el-table-column>
      <el-table-column label="操作" header-align="center" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope)"
            >删除</el-button
          >
          <el-button
            size="mini"
            type="success"
            @click="handleCheck()"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <Paging
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      style="margin-top: 10px"
      :tableData="articledata"
    ></Paging>
  </div>
  </div>
</template>

<script>
import Paging from "../components/Paging/Paging";
export default {
  name: "Published",
  components: {
    Paging
  },
  props: {},
  data() {
    return {
      articledata: {},
      currentPage: 1,
      pagesize: 10
    };
  },
  methods: {
    getArticledata() {
      this.$axios
        .req("api/article/allArticle")
        .then(response => {
          if (response) {
            this.articledata = response.data;
            this.articledata.map((item) => {
            item.timeT = this.$moment(item.date).format("YYYY年MM月DD日 HH时mm分ss秒")
            })
            console.log(this.articledata);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleEdit(scope) {
      this.$router.push({name: "edited",query:{data: JSON.stringify(scope.row)}})
    },
    handleDelete(scope) {
      this.$axios
        .req("api/article/delete", {
          _id: scope.row._id
        })
        .then(response => {
          if (response) {
            if (response.code === 200) {
              this.getArticledata()
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCheck() {
      this.$router.push({name: "checked"})
    },
    handleSizeChange(data) {
      this.pagesize = data;
    },
    handleCurrentChange(data) {
      this.currentPage = data;
    }
  },
  mounted() {
    this.getArticledata();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss"></style>
