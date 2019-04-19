<template>
  <div class="storeDisplay">
     <el-form :model="user" :rules="rules" ref="user" label-width="120px" class="">
    <div class="topInfo">
      <el-form-item prop="roleId">
        <span>角色</span>
        <el-select size="small" style="width: 100px"
        v-model="selectProv"
        placeholder=""
        v-on:change="getProv($event)">
        <el-option v-for="(item,i) in provs"
            :label="item.roleName"
            :key="i"
            :value="item.id">
        </el-option>
        </el-select>
        <span class="put">
          <span>账号名</span>
          <el-input v-model="userName" placeholder="单行输入"></el-input>
        </span>
        <span>用户名</span>
        <el-input class="loginName" v-model="loginName" placeholder="单行输入"></el-input>
        <el-button size="mini" @click="searchInfo">
        搜索
      </el-button >
       </el-form-item>

    </div>

    <div class="newAdd">
      <el-button
      class="btn_position"
      type="primary"
      size="mini"
       @click="$router.push('/userEdit')"
      >新增</el-button>
    </div>
    <div class="main-buttom">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="avatorLink"
          label="头像"
          width="100">
          <template slot-scope="scope">
            <img width="50" height="50" :src="scope.row.avatorLink" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="账号名"
          width="120">
          <template slot-scope="scope">
            {{scope.row.loginName}}
          </template>
        </el-table-column>
        <el-table-column
          prop="province"
          label="用户名"
          width="200">
          <template slot-scope="scope">
            {{scope.row.userName}}
          </template>
        </el-table-column>
        <el-table-column
          prop="city"
          label="角色名称"
          width="180">
           <template slot-scope="scope">
            {{scope.row.roleName}}
          </template>
        </el-table-column>
        <el-table-column
         fixed="right"
          label="操作"
          width="300">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row.id)" type="primary " size="small">编辑</el-button>
            <el-button type="text" @click="open2(scope.row.id)"><el-button
              class="btn_size delet"
              type="warning"
              size="mini"
            >删除</el-button></el-button>
          </template>
          <el-button>新增</el-button>
        </el-table-column>
      </el-table>
    </div>
    </el-form>
  </div>
</template>

<script>
import CONSTANT from '@/constant/constant.js';
let common = require("@/common.js");
export default {
  data() {
    return{
      input:'',
      id:'',
      userName:'',
      citys: [],
      tableData: [],
      selectProv: '',
      search: '',
      loginName: '',
      user: {
              userName:'',
              passwd:'',
              confirmPasswd:'',
              loginName:'',
              mobile:'',
              roleName:'',
              roleId:'',
              roleCode:0,
              roleList:[],
          },
      rules: {
          // roleId:[
          //         { required: true, message: '请选择角色类型', trigger: 'blur' },
          //     ]
            },
      provs:[],
      roleId:'',
    }
  },
  mounted(){
    this.getList();
  },
   methods: {
      handleClick(id) {
        this.$router.push({path:'/userEdit',query:{id:id}})
      },
      // 获取列表
    getList(roleId=null,userName=null,loginName=null) {
      // console.log(roleId,userName,loginName);
      let url = CONSTANT.ADMIN.PAGE;
      let data = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        roleId: roleId==='' ? null : roleId,
        loginNameLike: userName==='' ? null : userName,
        userNameLike: loginName==='' ? null : loginName,
      };
      let pageParam = JSON.stringify(data);
      common.postNoSess(url, pageParam, null, res => {
        let data = res.data;
        console.log(data);
        this.tableData = data.bussData;
        this.pageCount = data.pageCount * this.pageSize;
        var newUserName = data.bussData.map(item=>{
          return{
            userName:item.userName,
            id:item.id,
          }
        })
         let url = CONSTANT.ROLE.LIST;
         common.postNoSess(url, null, null, res => {
           console.log(res);
           var newData = res.data.bussData.map(item =>{
             return{
               id:item.id,
               roleName:item.roleName
             }
           })
          this.provs = newData;
         })
      });
    },
    getProv(prov) {
      this.roleId = prov;
      console.log(prov);
      },
      // 搜索
      searchInfo(){
        this.getList(this.roleId,this.userName,this.loginName);
      },
      // 删除
      open2(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        let url = CONSTANT.ADMIN.DELETE+`?id=${id}`;
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
  .newAdd{
    float: right;
    margin:20px 0;
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
  .loginName, .el-input{
    width: 180px;
  }
  .el-form-item__content{
    margin-left: 0!important;
  }
  /* .el-form-item{
    float: left;

  } */
  .put{
    margin-left:80px;
  }
</style>
