<template>
  <div class="storeDisplay">
    <p class="pageSwiper">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/storeDisplay' }">/&nbsp;门店形象&nbsp;/</el-breadcrumb-item>
      </el-breadcrumb>
    </p>
    <div class="topInfo">
      <span>省份</span>
      <el-select v-model="province" size="mini" placeholder="全国">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.province"
          :value="item.province">
        </el-option>
      </el-select>
      <span>城市</span>
        <el-select v-model="city" size="mini" placeholder="深圳">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.city"
          :value="item.city">
        </el-option>
      </el-select>
      <span>门店名称</span>
      <el-select
        v-model="value9"
        multiple
        size="mini"
        filterable
        remote
        reserve-keyword
        placeholder
        :loading="loading"
      >
        <el-option
          v-for="item in options4"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button size="mini">搜索</el-button>
      <el-button size="mini" @click="LinkToAddStore">添加门店</el-button>
    </div>
    <div class="main-buttom">
      <el-table
        :data="tabelData"
        style="width: 100%;text-align:center"
      >
        <el-table-column prop="orderId" label="省份">
          <template slot-scope="scope">{{scope.row.province}}</template>
        </el-table-column>
        <el-table-column prop="status2" label="城市">
          <template slot-scope="scope">{{scope.row.city}}</template>
        </el-table-column>
        <el-table-column prop="productId" label="具体位置" width="200">
          <template slot-scope="scope">{{scope.row.address}}</template>
        </el-table-column>
        <el-table-column prop="productId" label="店名" width="150">
          <template slot-scope="scope">{{scope.row.shopName}}</template>
        </el-table-column>
        <el-table-column prop="productId" label="电话" width="180">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column fixed="right" prop="id" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              class="origin"
              @click="linkToEdit(scope.row.id)"
            >编辑</el-button>
            <el-button type="text" @click="open2(scope.row.id)">
              <el-button class="btn_size delet" type="warning" size="mini">删除</el-button>
            </el-button>
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
      options1: [],
      options2: [],
      input: '',
      address: '',
      province: '',
      id: '',
      phone: '',
      city: '',
      value: "",
      options4: [],
      value9: [],
      list: [],
      loading: false,
      states: ["Alabama", "Alaska", "Arizona", "Arkansas"],
      tabelData: [],
      pageIndex: 1,
      pageSize: 10,
      pageCount: null
    };
  },
  mounted() {
    this.getList();
    console.log(CONSTANT.SHOP.PROVINCE);
  },
  methods: {
    handleClick(row) {
      this.$router.push("/storeEdit");
    },
    LinkToAddStore() {
      this.$router.push("/addNewsStore");
    },
    // 获取管理数据列表
    getList() {
      let url = CONSTANT.SHOP.PAGE;
      let data = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      };
      let pageParam = JSON.stringify(data);
      common.post(url, pageParam, null, res => {
        console.log(res);
        let data = res.data;
        this.tabelData = data.bussData;
        this.pageCount = data.pageCount * this.pageSize;
        var newData = data.bussData.map(item=>{
          return{
            province:item.province,
            id:item.id
          }
        })
        this.options1 = newData;
        var newData2 = data.bussData.map(item=>{
          return{
            city:item.city,
            id:item.id
          }
        })
        this.options2 = newData2;
        console.log(newData);
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
    },
    open2(id) {
      this.deleteId = id;
      console.log(id);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = CONSTANT.SHOP.DELETE+`?id=${this.deleteId}`;
        common.postNoSess(url, null, null, res => {
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
    },
    linkToEdit(id){
      this.$router.push({ path: "/storeEdit", query: { id: id } });
    },
  }
};
</script>

<style scope>
.storeDisplay {
  line-height: 20px;
  border: 1px solid rgba(187, 187, 187, 1);
  padding: 0 10px;
  box-sizing: border-box;
}
.el-input__inner {
  height: 28px !important;
}
.pageSwiper {
  padding-top: 0;
  padding-left: 10px;
}
.topInfo {
  height: 60px;
  line-height: 60px;
  border: 1px solid rgba(187, 187, 187, 1);
}
.topInfo > span {
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  text-align: left;
  font-family: SourceHanSansSC-regular;
  padding: 0 30px;
}
.el-input--mini {
  width: 120px;
}
.main-buttom {
  width: 100%;
  border: 1px solid rgba(187, 187, 187, 1);
  margin-top: 10px;
}
</style>
