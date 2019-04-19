<template>
  <div class="storeDisplay">
    <p class="pageSwiper" heght="60">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/storeDisplay' }">/&nbsp;门店形象&nbsp;/</el-breadcrumb-item>
      </el-breadcrumb>
    </p>
    <div class="topInfo">
      <span>省份</span>
      <el-select size="small" style="width: 100px"
        v-model="selectProv"
        placeholder="请选择省份"
        v-on:change="getProv($event)">
        <el-option v-for="(item,i) in provs"
            :label="item.label"
            :key="i"
            :value="item.value">
        </el-option>
      </el-select>

      <span>城市</span>
        <el-select size="small" style="width: 100px"
            :disabled="selectProv ? false : true"
            v-model="selectCity"
            placeholder="请选择城市"
            v-on:change="getCity($event)">
          <el-option
            v-for="(item,j) in citys"
            :key="j"
            :label="item.label"
            :value="item.value">
          </el-option>
      </el-select>
      <br>
      <span>门店名称</span>
       <el-input v-model="search" @blur="noVal" size="mini" placeholder=""></el-input>
      <el-button size="mini" @click="searchShopName">搜索</el-button>
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
import PROVIN from '../../constant/city.js';
import PROVIN2 from '../../constant/city2.js';
import $ from 'jquery';
export default {
  data() {
    return {
      provs:[],
      citys: [],
      selectProv: '',
      search: '',
      selectCity: '',
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
      tabelData: [],
      pageIndex: 1,
      pageSize: 10,
      pageCount: null,
      peivArr:[],
      allCity:[],
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    noVal(){
      if(this.search == ''){
      this.getList()

      }
    },
    // 门店搜索
    searchShopName(){
       this.getList(this.search)
    },
    handleClick(row) {
      this.$router.push("/storeEdit");
    },
    LinkToAddStore() {
      this.$router.push("/addNewsStore");
    },
    // 获取管理数据列表
    getList(name,priveName,cityName) {
      let url = CONSTANT.SHOP.PAGE;
      let url2 = CONSTANT.SHOP.PROVINCESEARCH;
      let data =null;
      if(name){
        data = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          shopNameLike:this.search
        };
      } else{
        data = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        };
      }
      if (priveName) {
        data = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          provinceLike:priveName
        };
      }
      if (cityName) {
        data = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          cityLike:cityName
        };
      }

      let pageParam = JSON.stringify(data);
      common.post(url, pageParam, null, res => {
        // console.log(res);
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
        common.post(url2, null, null, res => {
          // {label:"北京市",value:"北京市"},
          var newDate = res.data.bussData.map( item =>{
            return{
              label:item,
              value:item
            }
          })
          // console.log(newDate);
           newDate.unshift({label:'所有',value:'所有'});
           this.provs = newDate;
        });
      });
    },
     /*二级联动选择地区*/
    getProv(prov) {
      let tempCity=[];             
      this.citys=[];
      this.selectCity=''; 
      this.allCity = PROVIN2;
      for (var val of this.allCity){
      if (prov == val.prov){
        tempCity.push({label: val.label, value: val.label})
       }
      }
      this.citys = tempCity;
      // console.log(this.selectProv);
      if(this.selectProv == '所有'){
        this.getList(null,null,null)
      }else{
        this.getList(null,this.selectProv)
      }
    },
    getCity(city) {
    console.log(city);
    this.getList(null,null,city)
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
  padding-top: 20px;
  padding-left: 10px;
}
.topInfo {
  height: 120px;
  line-height: 50px;
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
