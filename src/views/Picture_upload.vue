<template>
  <div>
    <el-card class="box-card">
      <div class="drag__and__drop">支持拖拽</div>
      <el-row>
        <el-col :span="24"
          ><div class="grid-content bg-purple-dark">
            ElementUi自带上传组件
          </div></el-col
        >
      </el-row>
      <el-upload class="upload-demo" drag action="api/upload" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
      <div class="picture__tailoring">支持剪裁</div>
      <el-row>
        <el-col :span="24"
          ><div class="grid-content bg-purple-dark">
            Vue-image-crop-upload
          </div></el-col
        >
      </el-row>
      <el-button type="primary" class="picture__upload__last" @click="uploadObj"
        >上传图片</el-button
      >
      <Myupload
        field="file"
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        :width="200"
        :height="200"
        v-model="show"
        :params="params"
        img-format="png"
        :headers="headers"
        url="api/upload"
      ></Myupload>
      <img :src="imgDataUrl" />
    </el-card>
  </div>
</template>

<script>
import "babel-polyfill";
import Myupload from "vue-image-crop-upload";
export default {
  name: "Picture_upload",
  components: {
    Myupload
  },
  props: {},
  data() {
    return {
      params: {
        token: "123456798",
        name: "avatar"
      },
      headers: {
        smail: "*_~"
      },
      imgDataUrl: "",
      show: false
    };
  },
  methods: {
    uploadObj() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl) {
      console.log("-------- crop success --------");
      this.imgDataUrl = imgDataUrl;
    },
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      console.log("field: " + field);
    },
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
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
.drag__and__drop {
  font-size: 24px;
}
.upload-demo {
  margin-top: 20px;
}
.bg-purple-dark {
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  background: #99a9bf;
  margin-top: 20px;
}
.picture__tailoring {
  font-size: 24px;
  margin-top: 20px;
}
.picture__upload__last {
  margin-top: 20px;
}
</style>
