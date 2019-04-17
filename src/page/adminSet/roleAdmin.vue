<template>
    <div class="contain">
        <div class="header">
            <el-button class="link" type="primary" >
                <router-link to="/roleEdit" style="color: #fff;">添加角色</router-link>
            </el-button>
        </div>
        <div class="table_con" style="margin-top: 20px;">
            <el-table :data="tableData" :border='true' style="text-align:center">
                  <el-table-column  prop="roleName"    label="角色名称" width='120'></el-table-column>
                  <el-table-column  prop="roleDesc" label="角色描述"></el-table-column>
                  <el-table-column  prop="topMenuName" label="拥有权限"></el-table-column>
                  <el-table-column  prop=""  label="操作" fixed='right' width='180'>
                      <template slot-scope="scope">
                          <el-button class="link" type="primary" size="mini">
                              <router-link  :to="{ path: 'roleEdit',query: {id: scope.row.id}}"   style="color: #fff;">编辑</router-link>
                          </el-button>
                          <el-button type="danger" size="mini" @click="deleteRole(scope.row.id)">删除</el-button>
                      </template>
                  </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
             <el-pagination   @size-change="handleSizeChange"  @current-change="handleCurrentChange"
                :current-page.sync="pageIndex"
                :page-size="pageSize"
                :page-sizes='[10,20,30,40]'
                layout="sizes, prev, pager, next"
                :total="pageCount">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import CONSTANT from '../../constant/constant.js';
let common = require("../../common.js");
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
    data() {
        return {
            actionShow:true,
            tableData:[],
            pageCount:null,
            pageIndex:1,
            pageSize:10,
            loading:true,
        }
    },
    mounted() {
        let path = this.$router.currentRoute.query.edit;
        // if(path == 'edit'){
        //    window.location.reload();
        //   this.$router.push('/roleList');
        // }
        this.getList();
    },
    methods: {
      getList(){
          let url = CONSTANT.ROLE.PAGE;
          let dataForm = {
              pageIndex:this.pageIndex,
              pageSize:this.pageSize
          }
          let param = JSON.stringify(dataForm);
          this.loading = true;
          common.postNoSess(url,param,null,(res)=>{
            console.log(res);
              this.loading = false;
              let data = res.data;
              this.tableData = data.bussData;
              this.pageCount = data.pageCount*this.pageSize;
          })
      },
      deleteRole(id) {
          this.$confirm('确定删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              let  url = CONSTANT.ROLE.DELETE+`?id=${id}`;
              common.postNoSess(url,null,null,(res)=>{
                  if(res.status == 'success'){
                      this.$message({
                          type:'success',
                          message:'删除成功!'
                      });
                      this.getList();
                  }
                  else{
                      this.$message({
                          type:'warning',
                          message:res.data.errMsg
                      })
                  }
              })
          }).catch(() => {
              this.$message({
                  type: 'info',
                  message: '已取消删除'
              });
          });
      },
      handleSizeChange(val) {
          this.pageSize= val;
          this.getRoleList();
      },
      handleCurrentChange(val) {
          this.pageIndex = val;
          this.getRoleList();
      },

    },
}
</script>
<style scoped>
    .el-input {
        width: 210px !important;
    }
    .el-input__inner{
        width: 210px !important;
    }
    .el-button--primary{
        background-color: #21b5cc !important;
        border: #21b5cc !important;
    }
    .el-button--info {
        color: #000;
        background: #fff !important;
        border: 1px solid #dcdfe6 !important;
    }
</style>
