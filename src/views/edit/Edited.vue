<template>
  <div>
    <div class="edited__first">
      <el-button type="info" @click="backoff">返回</el-button>
      <el-button type="primary" @click="releaseED">发布</el-button>
    </div>
    <div class="edited__second">
      <el-form
        :model="editedData"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="editedData.title"></el-input>
        </el-form-item>
        <el-form-item label="文章摘要" prop="abstract">
          <el-input v-model="editedData.abstract"></el-input>
        </el-form-item>
        <div class="article__second__dv">
          <el-form-item label="作者" prop="author" style="width: 300px">
            <el-input v-model="editedData.author"></el-input>
          </el-form-item>
          <el-form-item label="类目" prop="category">
            <el-select v-model="editedData.category" placeholder="请选择">
              <el-option label="Vue" value="vue"></el-option>
              <el-option label="React" value="react"></el-option>
              <el-option label="Node.js" value="nodejs"></el-option>
              <el-option label="性能优化" value="performance"></el-option>
              <el-option label="JavaScript" value="javascript"></el-option>
              <el-option label="小程序" value="procedures"></el-option>
              <el-option label="工具类" value="tool"></el-option>
              <el-option label="其他" value="other"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="来源" prop="source">
            <el-select v-model="editedData.source" placeholder="请选择">
              <el-option label="原创" value="original"></el-option>
              <el-option label="转载" value="reprint"></el-option>
              <el-option label="与他人合作" value="cooperation"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="重要性" prop="star">
            <el-select v-model="editedData.star" placeholder="请选择">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布时间" required>
            <el-form-item prop="date">
              <el-date-picker
                v-model="editedData.date"
                type="datetime"
                placeholder="选择日期时间"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-form-item>
          </el-form-item>
        </div>
      </el-form>
      <div>
        <div id="main1">
          <div>文章内容：</div>
          <mavon-editor v-model="editedData.text" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Edited",
  components: {},
  props: {},
  data() {
    return {
      editedData: {},
      rules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        abstract: [
          { required: true, message: "请输入文章摘要", trigger: "blur" },
          { min: 5, max: 30, message: "长度在 5 到 30 个字符", trigger: "blur" }
        ],
        author: [
          { required: true, message: "请输入作者", trigger: "blur" },
          { min: 1, max: 15, message: "长度在 1 到 15 个字符", trigger: "blur" }
        ],
        category: [{ required: true, message: "请选择类目", trigger: "blur" }],
        source: [{ required: true, message: "请选择来源", trigger: "blur" }],
        star: [{ required: true, message: "请选择重要性", trigger: "blur" }],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ]
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  methods: {
    backoff() {
      this.$router.push({ name: "published" });
    },
    releaseED() {
      this.$axios
        .req("api/article/update", {
          id: this.editedData._id,
          title: this.editedData.title,
          abstract: this.editedData.abstract,
          author: this.editedData.author,
          category: this.editedData.category,
          source: this.editedData.source,
          star: this.editedData.star,
          text: this.editedData.text,
          date: this.editedData.date
        })
        .then(response => {
          if (response) {
            this.$router.push({ name: "published" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.editedData = JSON.parse(this.$route.query.data);
    console.log(this.editedData);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.edited__first {
  display: flex;
  justify-content: space-around;
}
.edited__second {
  margin-top: 10px;
}
.article__second__dv {
  display: flex;
}
</style>
