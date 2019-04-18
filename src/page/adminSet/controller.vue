<template>
    <div class="contain">
        <el-button  size="mini" @click="getAdd">添加权限</el-button>
        <div class="input_modal" v-for="data in menuList" :key="data.id">
            <div class="input-item">
                <span>图标：</span>
                <el-upload class="avatar-uploader"
                  :action="upLoadUrl"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="data.iconLink" :src="data.iconLink" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div class="input-item">
                <span>名称：</span>
                <el-input v-model="data.menuName" placeholder="请输入" class="proName"  @keyup.enter.native="search"></el-input>
            </div>
            <div class="input-item">
                <span>URL：</span>
                 <el-input v-model="data.menuUrl" placeholder="请输入" class="proName"  @keyup.enter.native="search"></el-input>
            </div>
            <div class="input-item">
                <i class="el-icon-edit" @click="edit(data)"></i>
                <i class="el-icon-circle-plus" @click="plus(data.id)"></i>
                <i class="el-icon-remove" @click="remove(data.id)"></i>
                <i class="el-icon-upload2" @click="upload(data.id)"></i>
                <i class="el-icon-download" @click="download(data.id)"></i>
            </div>
            <div class="input_modal" v-for="value in data.subMenus" :key="value.id">
              <div class="input-item">
                <span>二级名称：</span>
                    <el-input v-model="value.menuName" placeholder="请输入" class="proName"  @keyup.enter.native="search"></el-input>
              </div>
              <div class="input-item">
                  <span>二级URL：</span>
                  <el-input v-model="value.menuUrl" placeholder="请输入" class="proName"  @keyup.enter.native="search"></el-input>
              </div>
              <div class="input-item">
                  <i class="el-icon-edit" @click="edit(value)"></i>
                  <i class="el-icon-circle-plus" @click="plus(value.id)"></i>
                  <i class="el-icon-remove" @click="remove(value.id)"></i>
                  <i class="el-icon-upload2"  @click="upload(value.id)"></i>
                  <i class="el-icon-download" @click="download(value.id)"></i>
              </div>
          </div>
          <el-button size="mini" @click="submit2(data.id)">二级菜单保存</el-button>
          <el-button size="mini" @click="submit">保存</el-button>
        </div>
        <div class="input_modal">
            <div class="input-item">
                <span>图标：</span>
                <el-upload class="avatar-uploader"
                  :action="upLoadUrl"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imgUrl" :src="imgUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div class="input-item">
                <span>名称：</span>
                <el-input v-model="name" placeholder="请输入" class="proName"  @keyup.enter.native="search"></el-input>
            </div>
            <div class="input-item">
                <span>URL：</span>
                 <el-input v-model="link" placeholder="请输入" class="proName"  @keyup.enter.native="search"></el-input>
            </div>
            <div class="input-item">
                <i class="el-icon-edit" @click="edit(data.id)"></i>
                <i class="el-icon-circle-plus"></i>
                <i class="el-icon-remove"></i>
                <i class="el-icon-upload2"></i>
                <i class="el-icon-download"></i>
            </div>
            <div class="input_modal">
              <div class="input-item">
                <span>二级名称：</span>
                    <el-input v-model="iconName" placeholder="请输入" class="proName"  @keyup.enter.native="search"></el-input>
              </div>
              <div class="input-item">
                  <span>二级URL：</span>
                  <el-input v-model="iconLink" placeholder="请输入" class="proName"  @keyup.enter.native="search"></el-input>
              </div>
              <div class="input-item">
                  <i class="el-icon-edit" @click="edit(value.id)"></i>
                  <i class="el-icon-circle-plus"></i>
                  <i class="el-icon-remove"></i>
                  <i class="el-icon-upload2"></i>
                  <i class="el-icon-download"></i>
              </div>
          </div>
          <el-button size="mini" @click="submit2">二级菜单保存</el-button>
          <el-button size="mini" @click="submit">保存</el-button>
        </div>
    </div>
</template>
<script>
import CONSTANT from '@/constant/constant.js';
let common = require("@/common.js");
export default {
  data () {
      return {
        name:'',
        link:'',
        iconLink:'',
        iconName:'',
        iconName2:'',
        iconLink2:'',
        upLoadUrl:'',
        upLoadUrl2:'',
        bannerKey: '',
        bannerLink: "",
        imgUrl: "",
        imgUrl2: "",
        loading2: false,
        menuList:[],
        data:''
      }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList(){
      let url = CONSTANT.AUTHOR.GETLIST;
        common.postNoSess(url,null,null,(res)=>{
          let data = res.data.bussData;
          console.log(data);
          var neaData = data.map(item=>{
            return{
              iconKey:item.iconKey,
              iconLink:item.iconLink,
              menuUrl:item.menuUrl,
              id:item.id,
              menuName:item.menuName,
              subMenus:item.subMenus.map(val=>{
                return{
                  id:val.id,
                  menuName:val.menuName,
                  menuUrl:val.menuUrl,
                  parentId:val.parentId,
                }
              })
            }
          })
          // console.log(neaData);
          this.menuList = neaData;
      });
    },
    getAdd(){
      // this.menuList.push('');
    },
    edit(val){
      console.log(val);
        let url = CONSTANT.AUTHOR.UPDATE;
        let data = {
          iconKey:val.iconKey,
          id:val.id,
          menuName:val.menuName,
          menuUrl:val.menuUrl,
        }
        let paran = JSON.stringify(data)
        common.postNoSess(url,paran,null,(res)=>{
          if(res.status == 'success') {
            this.$message({
                type: 'success',
                message: '修改成功!'
            });
          } else {
            this.$message({
                type: 'error',
                message: res.msg
            });
          }
      });
    },
    plus(id){
      console.log('新增id',id);
    },
    remove(id) {
      console.log(id);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
      }).then(() => {
        let url = CONSTANT.AUTHOR.DELETE+`?id=${id}`;
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
    },
    upload(id){
      console.log('上移',id);
      let url = CONSTANT.AUTHOR.UP+`?id=${id}`;
      common.postNoSess(url, null, null, res => {
        console.log(res);
        if(res.status == 'success') {
          this.$message({
            type: 'success',
            message: '上移成功!'
          });
          // 重新加载页面
          this.getList();
        }
      });
    },
    download(id){
      console.log('下',id);
      let url = CONSTANT.AUTHOR.DOWM+`?id=${id}`;
      common.postNoSess(url, null, null, res => {
        console.log(res);
        if(res.status == 'success') {
          this.$message({
            type: 'success',
            message: '下移成功!'
          });
          // 重新加载页面
          this.getList();
        }
      });
    },
    //图片上传
    beforeAvatarUpload(file) {
      this.loading2 = true
      let url = CONSTANT.SYSTEM.ADMINUPLOADFILE+`/${file.name.split(".")[1]}`;
      let sessionId = sessionStorage.getItem('sessionId');
      $.ajax({  url: url,  method: 'GET',
      data: {
        contentType: file.type
      },
      headers: {
        sessionId: sessionId,
      }}).success((res) =>{
         this.bannerKey = res.data.bussData.fileKey;
         this.upLoadUrl = res.data.bussData.uploadUrl;
         let downloadUrl =   res.data.bussData.downloadUrl;
         console.log(res);
        //  将bannerkey保存
         this.bannerKey = res.data.bussData.fileKey;
        common.uploadFile(this.upLoadUrl, file, file.type, res => {
            this.imgUrl = downloadUrl;
            // 图片预览加载成功
            this.loading2 = false;
        });
      }).fail((error) =>{
        console.log(error);
      })
    },
    submit2(id){
      console.log(id);
      let url = '';
      url = CONSTANT.AUTHOR.INSERT;
      let data = {
          iconKey:this.bannerKey,
          menuName:this.iconName,
          menuUrl:this.iconLink,
          parentId:id
      };
      if(this.id){ data.id = this.id};
      let param = JSON.stringify(data);
      common.postNoSess(url, param, null, res => {
        console.log('提交的结果',res);
        if(res.status == 'success') {
            this.$message({
                type: 'success',
                message: '保存成功!'
            });
            this.loading = false;
            setTimeout(() => {
              // this.$router.push("");
            }, 2000);
        } else {
            this.$message({
                type: 'error',
                message: res.msg
            });
          }
      });
    },
    // 保存
    submit(){
      let url = '';
      url = CONSTANT.AUTHOR.INSERT;
      let data = {
          iconKey:this.bannerKey,
          menuName: this.name || this.iconName,
          menuUrl:this.link || this.iconLink,
          parentId:0
      };
      if(this.id){ data.id = this.id};
      let param = JSON.stringify(data);
      common.postNoSess(url, param, null, res => {
        console.log('提交的结果',res);
        if(res.status == 'success') {
            this.$message({
                type: 'success',
                message: '保存成功!'
            });
            this.loading = false;
            setTimeout(() => {
              // this.$router.push("");
            }, 2000);
        } else {
            this.$message({
                type: 'error',
                message: res.msg
            });
          }
      });
    },
    // 获取列表数据
  },
}
</script>
<style lang="scss" scoped>
    .contain .input_modal .input-item span{
        margin-right: 0 !important;
    }
    .export {
        width: 80px;
        height: 36px;
        background-color: #21b5cc;
        border: 1px solid #21b5cc;
        color: #fff;
        border-radius: 4px;
        float: right;
        font-size: 14px;
    }
        .avatar-uploader {
            border-radius: 6px;
            box-sizing: border-box;
            vertical-align: top;
            .el-upload {
                cursor: pointer;
                position: relative;
                overflow: hidden;
                .avatar-uploader-icon {
                    font-size: 28px;
                    color: #8c939d;
                    width: 80px;
                    height: 80px;
                    line-height: 80px;
                    text-align: center;
                    border: 1px dashed #d9d9d9 !important;
                    border-radius: 6px;
                    margin-left: 6px;
                }
                .avatar {
                    width: 80px;
                    height: 80px;
                    display: block;
                }
            }
            .el-upload:hover {
                border-color: #20a0ff;
            }
        }
        .el-icon-iconName,i{
          font-size: 40px;
          width: 40px;
          height: 40px;
          cursor: pointer;
        }
</style>
