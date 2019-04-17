<template>
    <div class="contain">
        <el-button  size="mini" @click="getAdd">添加权限</el-button>
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
                <i class="el-icon-edit"></i>
                <i class="el-icon-circle-plus"></i>
                <i class="el-icon-remove"></i>
                <i class="el-icon-upload2"></i>
                <i class="el-icon-download"></i>
            </div>
          <el-butto @click="submit2">二级菜单保存</el-butto>
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
                <i class="el-icon-edit"></i>
                <i class="el-icon-circle-plus"></i>
                <i class="el-icon-remove"></i>
                <i class="el-icon-upload2"></i>
                <i class="el-icon-download"></i>

            </div>
        </div>
        <el-button size="mini" @click="submit">保存</el-button>
        <div class="input_modal">
            <div class="input-item">
                <span>图标：</span>
                <el-upload class="avatar-uploader"
                  :action="upLoadUrl2"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imgUrl2" :src="imgUrl2" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div class="input-item">
                <span>名称：</span>
                <el-input v-model="iconName2" placeholder="请输入" class="proName"  @keyup.enter.native="search"></el-input>
            </div>
            <div class="input-item">
                <span>URL：</span>
                 <el-input v-model="iconLink2" placeholder="请输入" class="proName"  @keyup.enter.native="search"></el-input>
            </div>
            <div class="input-item">
                <i class="el-icon-edit"></i>
                <i class="el-icon-circle-plus"></i>
                <i class="el-icon-remove"></i>
                <i class="el-icon-upload2"></i>
                <i class="el-icon-download"></i>
            </div>

        </div>
    </div>
</template>
<script>
import CONSTANT from '../../constant/constant.js';
let common = require("../../common.js");
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
      }
  },
  mounted() {
  },
  methods: {
    search(e){

    },
    getAdd(){

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
    submit2(){
      // this.submit();
    },
    // 保存
    submit(){
      let url = '';
      url = CONSTANT.AUTHOR.INSERT;
      let data = {
          iconKey:this.bannerKey,
          menuName: this.name || this.iconName,
          menuUrl:this.link || this.iconLink,
          parentId:67
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
        .el-icon-iconName{
          font-size: 40px;
          width: 40px;
          height: 40px;
        }
</style>
