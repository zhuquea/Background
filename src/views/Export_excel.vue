<template>
  <div>
    <div>
      <el-input
        placeholder="请输入你想搜索的商品名称"
        v-model="input"
        clearable
        style="width: 300px"
        @keydown.delete.native="deleteObj"
      ></el-input>
    </div>
    <div>
      <el-table
        :data="
          tableData.slice(pagesize * (currentPage - 1), pagesize * currentPage)
        "
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="NAME"
          label="名称"
          width="380"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="GOODS_SERIAL_NUMBER"
          label="商品编号"
          width="180"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="ORI_PRICE"
          label="原价"
          width="180"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="PRESENT_PRICE"
          label="现价"
          header-align="center"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope), (centerDialogVisible = true)"
              slot="reference"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope), (centerDialogVisible2 = true)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
      >
        <div class="export__dialog">
          <div class="export__dialog__dv">名称:</div>
          <el-input v-model="obj.NAME"></el-input>
        </div>
        <div class="export__dialog">
          <div class="export__dialog__dv">原价:</div>
          <el-input v-model="obj.ORI_PRICE"></el-input>
        </div>
        <div class="export__dialog">
          <div class="export__dialog__dv">现价:</div>
          <el-input v-model="obj.PRESENT_PRICE"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible2"
        width="30%"
        center
      >
        <span>你确定要删除{{ obj2.NAME }}吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="deleteObjO">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <Paging
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      style="margin-top: 10px"
      :tableData="tableData"
    ></Paging>
    <div class="export__last">
      <download-excel
        class="export-excel-wrapper"
        :data="
          tableData.slice(pagesize * (currentPage - 1), pagesize * currentPage)
        "
        :fields="json_fields"
      >
        <el-button type="primary">导出xls</el-button>
      </download-excel>
      <download-excel
        class="export-excel-wrapper"
        :data="
          tableData.slice(pagesize * (currentPage - 1), pagesize * currentPage)
        " type="csv"
      >
        <el-button type="danger">导出csv</el-button>
      </download-excel>
    </div>
  </div>
</template>

<script>
import Paging from "../components/Paging/Paging";
export default {
  name: "Export_excel",
  components: {
    Paging
  },
  props: {},
  data() {
    return {
      json_fields: {
        "Complete name": "NAME", //常规字段
        Telephone: "ORI_PRICE",
        Telephone2: "PRESENT_PRICE",//支持嵌套属性
        "Telephone 2": {
          field: "phone.landline",
          //自定义回调函数
          callback: value => {
            return `Landline Phone - ${value}`;
          }
        }
      },
      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " utf- 8 "
          }
        ]
      ],
      input: "",
      tableData: [],
      pagesize: 10,
      currentPage: 1,
      centerDialogVisible: false,
      centerDialogVisible2: false,
      obj: {},
      obj2: {}
    };
  },
  methods: {
    getTableData() {
      this.$axios
        .req("api/tableData")
        .then(response => {
          if (response) {
            this.tableData = response.data;
            this.arrArey = response.data;
            console.log(this.tableData);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteObj() {
      this.tableData = this.arrArey;
    },
    handleSizeChange(data) {
      this.pagesize = data;
    },
    handleCurrentChange(data) {
      this.currentPage = data;
    },
    handleEdit(scope) {
      this.obj = scope.row;
      console.log(scope.row);
    },
    handleDelete(scope) {
      this.obj2 = scope.row;
      console.log(this.obj2);
    },
    deleteObjO() {
      this.centerDialogVisible2 = false;
      this.tableData.splice(this.tableData.indexOf(this.obj2), 1);
    }
  },
  mounted() {
    this.getTableData();
  },
  created() {},
  filters: {},
  computed: {},
  watch: {
    // input (val) {
    //   this.tableData =  this.tableData.filter((item => {
    //     return JSON.stringify(item).includes(val)
    //   }))
    // }
    input(val) {
      this.tableData = this.tableData.filter(item => {
        return JSON.stringify(item).indexOf(val) !== -1;
      });
    }
  },
  directives: {}
};
</script>

<style scoped lang="scss">
.export__dialog {
  display: flex;
  margin-top: 10px;
}
.export__dialog__dv {
  width: 80px;
  line-height: 40px;
  text-align: center;
}
.export__last {
  margin-top: 20px;
  display: flex;
}
.export-excel-wrapper {
  margin-left: 20px;
}
</style>
