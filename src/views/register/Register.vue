<template>
  <div class="register__body">
    <el-card class="box-card">
      <div class="register__welcome">
        欢迎来到小爱后台管理系统
      </div>
      <div>
        <el-form
          :model="ruleForm1"
          :rules="rules1"
          label-width="130px"
          class="demo-ruleForm"
        >
          <el-form-item label="请输入用户名" prop="name">
            <el-input v-model="ruleForm1.name"></el-input>
          </el-form-item>
        </el-form>
        <el-form
          :model="ruleForm2"
          :rules="rules2"
          label-width="130px"
          class="demo-ruleForm"
        >
          <el-form-item label="请输入密码" prop="pass">
            <el-input
              v-model="ruleForm2.pass"
              type="password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="register__last">
        <el-button type="primary" class="register__now" @click="regnow"
          >立即注册</el-button
        >
        <el-button type="primary" class="login__now" @click="lognow"
          >立即登录</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Register",
  components: {},
  props: {},
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      ruleForm1: {
        name: "",
        delivery: false,
        type: []
      },
      ruleForm2: {
        name: "",
        delivery: false,
        type: [],
        pass: "",
        checkPass: ""
      },
      rules1: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ]
      },
      rules2: {
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            message: "密码长度必须大于6个字符",
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    regnow() {
      // let reg = new RegExp(/[\u4E00-\u9FA5]/)
      // if (this.ruleForm1.name.match(reg)) {
      //   this.$message({
      //     type: 'error',
      //     message: '用户名不能为中文'
      //   })
      // }
      this.$axios
        .req("api/user/register", {
          username: this.ruleForm1.name,
          password: this.ruleForm2.pass
        })
        .then(response => {
          if (response.code === 1) {
            this.$message.error("用户名已存在");
          } else if (response.code === 200) {
            this.$message.success("恭喜你，注册成功");
          } else if (response.code === 500) {
            this.$message.warning("请完成必填项");
          }
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    },
    lognow() {
      this.$router.push({ name: "login" });
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
.register__body {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("xingkong.jpg");
  background-size: 100%;
}
.box-card {
  width: 500px;
  height: 300px;
  margin: 100px auto;
}
.register__welcome {
  text-align: center;
  margin-bottom: 20px;
  font-size: 20px;
}
.register__now,
.login__now {
  margin-left: 90px;
}
.register__last {
  margin-top: 50px;
}
</style>
