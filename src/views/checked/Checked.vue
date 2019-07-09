<template>
  <div>
    <div>
      <el-button type="info" @click="backoff">返回</el-button>
    </div>
    <div class="checked__second">
      <div v-html="checkedData.title"></div>
      <div>摘要：{{ checkedData.abstract }}</div>
      <div>作者：{{ checkedData.author }}</div>
    </div>
    <div>
      <div class="main1">
        <div>文章内容：</div>
        <mavon-editor
          :value="checkedData.text"
          :defaultOpen="preview"
          :toolbarsFlag="str1"
          :editable="str2"
          :subfield="str3"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Checked",
  components: {},
  props: {},
  data() {
    return {
      checkedData: "",
      preview: "preview",
      str1: false,
      str2: false,
      str3: false
    };
  },
  methods: {
    backoff() {
      this.$router.push({ name: "published" });
    }
  },
  mounted() {
    this.checkedData = JSON.parse(this.$route.query.data);
    console.log(this.checkedData);
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.checked__second {
  text-align: center;
}
.main1 {
  z-index: -1;
}
</style>
