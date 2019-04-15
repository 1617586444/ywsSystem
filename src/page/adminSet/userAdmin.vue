<template>
  <div class="storeDisplay">
    <div class="topInfo">
      <span>角色</span>
      <el-select v-model="value" size="mini" placeholder="全国">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span>用户名</span>
      <el-select v-model="value" size="mini" placeholder="深圳">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span>账户名</span>
      <el-select
        v-model="value9"
        multiple
        size="mini"
        filterable
        remote
        reserve-keyword
        placeholder=""
        :remote-method="remoteMethod"
        :loading="loading">
        <el-option
          v-for="item in options4"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button size="mini">
        搜索
      </el-button >
      <el-button size="mini" @click="LinkToAddStore">
        添加门店
      </el-button>
    </div>
    <div class="main-buttom">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="date"
          label="头像"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="账号名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="province"
          label="用户名"
          width="200">
        </el-table-column>
        <el-table-column
          prop="city"
          label="角色名称"
          width="180">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="300">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary " size="small">编辑</el-button>
            <el-button type="primary " size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
let CONSTANT = require('../../constant/constant.js');
let common = require("../../common.js");
export default {
  data() {
    return{
      input:'',
      options: [
          {
          value: '全国',
          label: '全国'
        },
        {
          value: '广东',
          label: '广东'
        },
        {
          value: '福建',
          label: '福建'
        }
        ],
      options2: [
          {
          value: ' 深圳',
          label: ' 深圳'
        },
        {
          value: '惠州',
          label: '惠州'
        },
        {
          value: '东莞',
          label: '东莞'
        }
        ],
         value: '',
         options4: [],
        value9: [],
        list: [],
        loading: false,
        states: ["Alabama", "Alaska", "Arizona",
        "Arkansas"],
        tableData: [{
          date: '广东',
          name: '深圳',
          province: '深南大道',
          city: '冰纷万象店',
          address: '0755-33322211',
          zip: 200333
        }, {
          date: '广东',
          name: '深圳',
          province: '深南大道',
          city: '冰纷万象店',
          address: '0755-33322211',
          zip: 200333
        },]
    }
  },
   methods: {
      handleClick(row) {
        this.$router.push('/storeEdit')
      },
      LinkToAddStore() {
        this.$router.push('/addNewsStore')
      }
    },
}

</script>

<style scope>
  .storeDisplay{
    height:620px;
    line-height: 20px;
    border: 1px solid rgba(187, 187, 187, 1);
    padding:0 10px;
    box-sizing: border-box;
  }
  .el-input__inner{
    height:28px !important;
  }
  .pageSwiper{
    padding-top:0;
    padding-left:10px;
  }
  .topInfo{
    height:60px;
    line-height: 60px;
    border: 1px solid rgba(187, 187, 187, 1);
  }
  .topInfo>span{
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
    text-align: left;
    font-family: SourceHanSansSC-regular;
    padding:0 30px;
  }
  .el-input--mini{
    width:120px;
  }
  .main-buttom{
    width:100%;
    height:480px;
    border: 1px solid rgba(187, 187, 187, 1);
    margin-top:10px;
  }
</style>
