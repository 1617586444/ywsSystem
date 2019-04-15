<template>
  <div class="contain">
    <div class="input_modal">
      <span>分类名</span>
      <el-select @change="handleChange" v-model="value" placeholder="文胸 breo">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
          >
        </el-option>
      </el-select>
      <el-button>确定</el-button>
    </div>
    <div class="table-content">
      <el-button type="primary" size="mini" class="addDetail" @click="linkToDetail()">新增</el-button>
      <el-table
        stripe
        :data="tabelData"
        style="width: 100%;text-align:center"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="orderId" label="商品所属分类">
          <template slot-scope="scope">
            {{scope.row.categoryName}}
          </template>
        </el-table-column>
        <el-table-column prop="status2" width="300" label="商品名称">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column prop="productId" label="配图1">
          <template slot-scope="scope">
            <img width="120" height="80" :src="scope.row.categoryImage2Link" alt="">
          </template>
        </el-table-column>
        <el-table-column fixed="right" prop="id" label="操作" >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" class="origin" @click="linkToDetail(scope.row.id)">编辑</el-button>
            <el-button type="text" @click="open2"><el-button
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
import CONSTANT from "../../constant/constant.js";
let common = require("../../common.js");
export default {
  data() {
    return {
      buyerId: "",
      buyerName: "",
      gmtCreatedGE: "",
      gmtCreatedLE: "",
      orderId: "",
      productId: "",
      sellerId: "",
      sellerName: "",
      statusIn: [],
      pageIndex: 1,
      pageSize: 10,
      pageCount: null,
      tabelData: [],
      options: [
          {
          value: '1文胸',
        },
        {
          value: '2泳装',
        },
        {
          value: '3家居',
        }
        ],
      value: '14',
      categoryId: '14',
    };
  },
  mounted() {
    this.getList();
    this.handleChange();
  },
  methods: {
    // 获取管理数据列表
    getList() {
      let url = CONSTANT.PRODUCT.PAGE;
      let data = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        categoryId: this.value || this.categoryId,
      };
      let pageParam = JSON.stringify(data);
      common.post(url, pageParam, null, res => {
        console.log(res);
        let data = res.data;
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
    linkToDetail(id) {
      this.$router.push({ path: "/directionalDetail", query: { id: id } });
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
    // 选择发生改变
    handleChange(){
       let url = CONSTANT.CATEGORY.LIST;
      common.postNoSess(url, null, null, res => {
        let data = res.data;
      var newData = data.bussData.map(item =>{
              return {
                name:item.name,
                id:item.id
              }
        })
        this.options = newData;
        this.getList()
        console.log(this.value);
      });
    },
    open2() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
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
.input_modal{
  height: 50px;
  line-height: 20px;
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
.addDetail{
  position: absolute;
  top:220px;
  right:120px;
  z-index: 10;
}
</style>
