<template>
  <div class="publish__article">
    <div class="article__first">
      <div class="article__see"><el-button type="danger" @click="checked">查看</el-button></div>
      <div class="article__release"><el-button type="primary" @click="released">发布</el-button></div>
      <div class="article__return" v-if="showhide===false"><el-button type="info" @click="returned">返回</el-button></div>
    </div>
    <div v-if="showhide">
    <div class="article__second">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="文章标题" prop="name1">
          <el-input v-model="ruleForm.name1"></el-input>
        </el-form-item>
        <el-form-item label="文章摘要" prop="name2">
          <el-input v-model="ruleForm.name2"></el-input>
        </el-form-item>
       <div class="article__second__dv">
         <el-form-item label="作者" prop="name3" style="width: 300px">
         <el-input v-model="ruleForm.name3"></el-input>
       </el-form-item>
         <el-form-item label="类目" prop="region1">
           <el-select v-model="ruleForm.region1" placeholder="请选择">
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
         <el-form-item label="来源" prop="region2">
           <el-select v-model="ruleForm.region2" placeholder="请选择">
             <el-option label="原创" value="original"></el-option>
             <el-option label="转载" value="reprint"></el-option>
             <el-option label="与他人合作" value="cooperation"></el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="重要性" prop="region3">
           <el-select v-model="ruleForm.region3" placeholder="请选择">
             <el-option label="1" value=1></el-option>
             <el-option label="2" value=2></el-option>
             <el-option label="3" value=3></el-option>
             <el-option label="4" value=4></el-option>
             <el-option label="5" value=5></el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="发布时间" required>
           <el-col :span="11">
             <el-form-item prop="date1">
               <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 200px;"></el-date-picker>
             </el-form-item>
           </el-col>
         </el-form-item>
       </div>
      </el-form>
    </div>
    <div id="main">
      <mavon-editor v-model="textvalue"/>
    </div>
    <div>
      <div class="article__last"><el-button type="primary" @click="released">发布</el-button></div>
    </div>
    </div>
    <div v-else-if="showhide === false" class="checked__content">
      <div>文章标题：{{ruleForm.name1}}</div>
      <div>文章摘要：{{ruleForm.name2}}</div>
      <div>发布时间：{{ruleForm.date1}}</div>
      <div id="main1">
        <div>文章内容：</div>
        <mavon-editor v-model="textvalue"/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Publish_article",
  components: {},
  props: {},
  data() {
    return {
      ruleForm: {
        name1: '',
        name2: '',
        name3: '',
        region1: '',
        region2: '',
        region3: '',
        date1: '',
        delivery: false,
      },
      rules: {
        name1: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        name2: [
          { required: true, message: '请输入文章摘要', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        name3: [
          { required: true, message: '请输入作者', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        region1: [
          { required: true, message: '请选择类目', trigger: 'change' }
        ],
        region2: [
          { required: true, message: '请选择来源', trigger: 'change' }
        ],
        region3: [
          { required: true, message: '请选择重要性', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]
      },
      textvalue: "",
      showhide: true
    };
  },
  methods: {
    released () {
    this.$axios.req("api/article/create",{
      title: this.ruleForm.name1,
      abstract: this.ruleForm.name2,
      author: this.ruleForm.name3,
      category: this.ruleForm.region1,
      source: this.ruleForm.region2,
      star: this.ruleForm.region3,
      text: this.textvalue,
      date: this.ruleForm.date1
    }).then( (response) => {
      if (response.code === 200) {
         this.$message.success("恭喜你，创建成功")
      }else {
        this.$message.warning("请按要求完成发布文章")
      }
      console.log(response)
    }).catch((err) => {
      console.log(err);
    })
      this.ruleForm.name1 = ""
      this.ruleForm.name2 = ""
      this.ruleForm.name3 = ""
      this.ruleForm.region1 = ""
      this.ruleForm.region2 = ""
      this.ruleForm.region3 = ""
      this.textvalue = ""
      this.ruleForm.date1 = ""
    },
    checked () {
     this.showhide = false
    },
    returned () {
      this.showhide = true
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
  .article__first {
    height: 50px;
    line-height: 50px;
    background-color: cadetblue;
    position: relative;
  }
  .article__see {
    position: absolute;
    top: 0;
    right: 150px;
  }
 .article__release {
   position: absolute;
   top: 0;
   right: 50px;
 }
 .article__return {
   position: absolute;
   top: 0;
   right: 50px;
 }
  .article__second {
    margin-top: 20px;
  }
  .article__second__dv {
    display: flex;
  }
  .article__last {
   margin-top: 20px;
    margin-left: 50%;
    transform: translate(-35px);
  }
  .checked__content {
    text-align: center;
  }
  .checked__content>div {
    margin-top: 10px;
  }
</style>
