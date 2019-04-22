<template>

  <div class="contain">
    <div class="headAdd">
        <el-button type="primary" size="mini" @click="linkToVideoDetail()">新增</el-button>
    </div>
    <div class="table-content">
      <el-table
        :data="tabelData"
        style="width: 100%;text-align:center !important;"
        :border="true"
      >
        <el-table-column type="text" width="300" label="视频标题">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column prop="isHide" width="200" label="是否展示">
          <template slot-scope="scope">
            {{scope.row.enable ? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column prop="id" label="操作" fixed="right" width="500px">
          <template slot-scope="scope">
            <el-button
              class="btn_size"
              type="primary"
              size="mini"
              @click="linkTovideoView(scope.row.id)"
            >查看</el-button>
            <el-button
              class="btn_size"
              type="primary"
              size="mini"
              @click="linkToVideoDetail(scope.row.id)"
            >编辑</el-button>
            <el-button type="text" @click="open2(scope.row.id)"><el-button
              class="btn_size"
              type="warning"
              size="mini"
            >删除</el-button></el-button>
            <el-button
              class="btn_size"
              type="warning"
              size="mini"
              @click="showUpdata(scope.row.id)"
            >{{scope.row.enable ? '隐藏' : '显示'}}</el-button>
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
      pageCount: null,
      pageIndex: 1,
      pageSize: 10,
      tabelData: [],
      ids: [],
      pageIndex:1,
      pageSize:10,
      deleteId:'',
      enable: '',
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    //获取视频列表数据
    getList() {
      let url = CONSTANT.PRODUCTMANAGE.FINDPAGE;
      let data = {
        pageIndex:this.pageIndex,
        pageSize:this.pageSize
      }
      let param = JSON.stringify(data);
      common.postNoSess(url, param, null, res => {
        // console.log(res);
        let data = res.data;
        this.enable = data.bussData[0].enable;
        this.tabelData = data.bussData;
        this.pageCount = data.pageCount * this.pageSize;
      });
    },
    //点击开关改变显示状态
    showUpdata(id) {
      console.log(id);
      let isHideId = JSON.stringify(id);
      let url = `${CONSTANT.PRODUCTMANAGE.ENABLE}?id=${isHideId}`;
      common.postNoSess(url, null, null, res => {
        // console.log(res);
        this.enable = res.data.bussData;
        this.getList();
      });
    },
    linkTovideoView(id) {
      this.$router.push({ path: "/videoView", query: { id: id } });
    },
    linkToVideoDetail(id) {
      this.$router.push({ path: "/videoRedact", query: { id: id } });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
    },
    // 删除
    open2(id) {
      this.deleteId = id;
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
          let url = CONSTANT.PRODUCTMANAGE.DELETE+`?id=${this.deleteId}`;
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
      }
  },
  filters: {

  }
};
</script>

<style lang="scss" scoped>
.contain .table-content {
  text-align: center !important;
}
.contain {
  .btn_size {
    width: 68px !important;
  }
  .el-dialog__body {
    padding-left: 0;
    padding-top: 30px;
    border-top: 1px solid #dedede;
  }
  .dialog-con {
    display: flex;
    justify-content: space-between;
    ul {
      width: 28%;
      list-style: none;
      padding: 0;
      font-size: 14px;
      float: left;
      margin-top: 0;
      z-index: 999;
      li {
        list-style: none;
        height: 60px;
        line-height: 60px;
        text-align: center;
        display: block;
      }
      li.active {
        color: #5c9eff;
        background-color: #fff;
        font-size: 16px;
        border-right: 2px solid #5c9eff;
      }
      //   li:hover{font-size:16px; }
    }
    .tab-content {
      width: 70%;
      display: inline-block;
      padding-left: 10%;
      background-color: #fff;
      min-height: 300px;
      .sort {
        .sort_name {
          font-weight: 600;
          margin-bottom: 5px;
        }
        .group-list {
          padding-left: 20px;
          .el-radio {
            display: block;
            margin-left: 0;
            margin-bottom: 3px;
          }
        }
      }
    }
    .el-button--default {
      background-color: #fff !important;
    }
  }
}
.headAdd{
  position: absolute;
  right:90px;
  top:120px;
  z-index: 10;
}
</style>
