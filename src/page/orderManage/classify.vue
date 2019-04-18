<template>
  <div class="contain">
    <div class="table-content">
      <el-button type="primary" size="mini" class="addDetail1" @click="linkToDetail()">新增</el-button>
      <el-table
        stripe
        :data="tabelData"
        style="width: 100%;text-align:center"
        :border="true"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="orderId" label="分类名">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column prop="status2" label="配图1">
          <template slot-scope="scope">
            <img :src="scope.row.image1Link" alt="" width="148" height="54">
          </template>
        </el-table-column>
        <el-table-column prop="productId" label="配图2">
          <template slot-scope="scope">
            <img :src="scope.row.image2Link" alt="" width="148" height="54">
          </template>
        </el-table-column>
        <el-table-column fixed="right"></el-table-column>
        <el-table-column prop="id" label="操作" >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" class="origin" @click="linkToEdit(scope.row.id)">编辑</el-button>
            <el-button type="text" @click="open2(scope.row.id)"><el-button
              class="btn_size delet"
              type="warning"
              size="mini"
            >删除</el-button></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageIndex"
        :page-size="pageSize"
        :page-sizes="[10,20,30,40]"
        layout="sizes, prev, pager, next"
        :total="pageCount"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import CONSTANT from "@/constant/constant.js";
let common = require("@/common.js");
export default {
  data() {
    return {
      buyerId: "",
      orderId: "",
      productId: "",
      pageIndex: 1,
      pageSize: 10,
      pageCount: null,
      tabelData: [],
      deleteId:'',
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 获取好物列表
    getList() {
      let url = CONSTANT.CATEGORY.PAGE;
      let data = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      };
      let pageParam = JSON.stringify(data);
      common.post(url, pageParam, null, res => {
        let data = res.data;
        console.log(res);
        this.tabelData = data.bussData;
        this.pageCount = data.pageCount * this.pageSize;
      });
    },
    search(e) {
      if (e.keyCode == 13) {
        this.pageIndex = 1;
        this.getList();
      }
    },
    //详情
    linkToDetail() {
      this.$router.push({ path: "/classifyModify"});
    },
    linkToEdit(id) {
      this.$router.push({ path: "/classifyModify", query: { id: id } });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
    },
    handleSelectionChange(val) {
    },
    open2(id) {
      this.deleteId = id;
      console.log(id);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
      }).then(() => {
        let url = CONSTANT.CATEGORY.DELETE+`?id=${this.deleteId}`;
        common.postNoSess(url, null, null, res => {
          console.log(res);
          let data = res.data;
          if(res.status == 'success') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            // 重新加载页面
            this.getList();
          }
        });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
      });
    }
  },
  filters: {}
};
</script>
<style lang="scss" scoped>
.contain .input_modal .input-item span {
  margin-right: 0 !important;
}
.el-select{
  margin: 0 60px 0 20px;
}
.origin{
  background:#FFC14E;
}
.delet{
  background:#FC7982 100%;
}

.export {
  width: 80px;
  height: 36px;
  background-color: #5c9eff;
  border: 1px solid #5c9eff;
  color: #fff;
  border-radius: 4px;
  float: right;
  font-size: 14px;
}
.addDetail1{
  position: absolute;
  top:120px;
  right:120px;
  z-index: 10;
}
</style>
