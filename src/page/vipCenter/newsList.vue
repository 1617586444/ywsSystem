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
        <el-table-column prop="orderId" label="新闻列表"></el-table-column>
        <el-table-column fixed="right"></el-table-column>
        <el-table-column prop="id" label="操作" >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" class="origin" @click="linkToDetail(scope.row.orderId)">编辑</el-button>
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
      statusList: [
        { value: "WAIT_PAY", label: "2019年产品排行榜热榜Top10 快来看！" },
        { value: "CANCEL", label: "2019年产品排行榜热榜Top10 快来看！" },
        { value: "WAIT_DELIVERY", label: "2019年产品排行榜热榜Top10 快来看！" },
        { value: "WAIT_RECEIVING", label: "2019年产品排行榜热榜Top10 快来看！" },
        { value: "APPLY_REFUND", label: "2019年产品排行榜热榜Top10 快来看！" },
        { value: "AGREE_REFUND", label: "2019年产品排行榜热榜Top10 快来看！" },
        { value: "COMPLETE", label: "2019年产品排行榜热榜Top10 快来看！" }
      ],
      timeArray: [],
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
         value: ''
    };
  },
  mounted() {
    this.getList();

  },
  methods: {
    //时间查询
    dateChange(e) {
      this.gmtCreatedGE = e[0];
      this.gmtCreatedLE = e[1];
    },
    // 审核状态查询
    auditChange(e) {
      this.statusIn = e;
      this.getList();
    },
    // 获取好物列表
    getList() {
      let url = CONSTANT.ORDERMANAGE.DIRECTIONFINDPAGE;
      let data = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        buyerId: this.buyerId,
        buyerName: this.buyerName,
        gmtCreatedGE: this.gmtCreatedGE,
        gmtCreatedLE: this.gmtCreatedLE,
        orderId: this.orderId,
        productId: this.productId,
        sellerId: this.sellerId,
        sellerName: this.sellerName,
        statusIn: this.statusIn
      };
      let pageParam = JSON.stringify(data);
      common.post(url, pageParam, null, res => {
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
      this.$router.push({ path: "/newsListEdit", query: { id: id } });
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
