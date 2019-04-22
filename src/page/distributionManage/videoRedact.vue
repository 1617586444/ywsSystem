<template>
  <div id="upDate"
      v-loading="loading2"
      element-loading-text="拼命上传中..."
      element-loading-spinner="el-icon-loading"
      >
    <header>
      <p class="pageSwiper">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/videoList' }">视频管理</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">编辑</a></el-breadcrumb-item>
        </el-breadcrumb>
      </p>
    </header>
    <el-form :model="information" :rules="rules" ref="information" label-width="120px" class="">
    <div class="swiper-img">
      <span>视频名称</span>
      <el-input class="put" v-model="input" placeholder="黑客帝国删减版part2"></el-input>

    </div>
    <div class="show-video">
      <span>是否展示</span>
      <el-select v-model="value" placeholder="否">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
     </el-select>
    </div>
    <div class="videoShow show-video">
      <span>视频预览</span>
      <el-form-item label="" prop="videoKey">
        <el-upload
          class="upload-demo upVideo"
          :action="upLoadUrl"
          :before-upload="beforeAvatarUpload"
          :file-list="fileList"
          >
          <el-button class="endit-vid" size="small" type="primary">{{id ? '点击更换视频' : '点击新增视频'}}</el-button>
        </el-upload>
      </el-form-item>
    </div>
    <div class="viewWindos">
      <el-form-item prop="imageKey" >
          <el-upload class="avatar-uploader" style="margin-left:0;"
              :action="upLoadUrl"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload2">
              <img v-if="imgUrl" :src="imgUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon">视频首页图</i>
          </el-upload>
      </el-form-item>
    </div>
     <el-form-item>
    <div class="qued">
      <el-button type="primary"
      @click="submit('information')"
      >确定</el-button>
    </div>
    </el-form-item>
    </el-form>
  </div>
</template>

<script>
import CONSTANT from "../../constant/constant.js";
let common = require("../../common.js");
  export default {
    data() {
      return {
        fileList: [],
        input: '黑客帝国动画版',
        options: [
          {
          value: '是',
          label: '是'
        },
        {
          value: '否',
          label: '否'
        }
        ],
        value: '否',
        id:'',
        imgUrl: '',
        videoUrl:'',
        upLoadUrl: '',
        loading: '',
        enable: false,
        loading2: false,
        information: {
          imageKey:'',
          videoKey:'',
        },
        rules: {
            imageKey:[
                { required: true, message: '请上传图片', trigger: 'blur' },
            ],
        },
      };
    },
    mounted() {
        this.id  = this.$router.currentRoute.query.id;
        if(this.id){
          console.log(this.id);
          this.getDetail();
        }
    },
     methods: {
      // 确定保存
      submit(formName){
          this.$refs[formName].validate((valid) => {
          if (valid) {
              this.loading = true;
              let url = '';
              if(this.id){url = CONSTANT.PRODUCTMANAGE.UPDATA;}else{url = CONSTANT.PRODUCTMANAGE.EDITLIST;}
              if(this.value == '是'){
                this.enable = true;
              } else if (this.value == '否') {
                this.enable = false;
              }
              let data = {
                  imageKey:this.information.imageKey,
                  videoKey:this.information.videoKey,
                  enable: this.enable,
                  name:this.input
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
                        this.$router.push("/videoList");
                      }, 2000);
                  } else {
                      this.$message({
                          type: 'error',
                          message: res.msg
                      });
                      this.loading = false;
                  }
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 获取视频
      getDetail(){
        let url = CONSTANT.PRODUCTMANAGE.DETAIL+`?id=${this.id}`;
        common.postNoSess(url,null,null,(res)=>{
            let data = res.data.bussData;
            console.log(res);
            this.input = res.data.bussData.name;
            this.value = res.data.bussData.enable ? '是' : '否';
            this.imgUrl = res.data.bussData.imageLink;
            // 将imageKey  videoKey 保存
            this.information.imageKey = res.data.bussData.imageKey;
            this.information.videoKey = res.data.bussData.videoKey;
        });
      },
      //上传视频
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
        }}).success((res)=>{
          console.log('得到视频key',res.data.bussData.fileKey);
          this.upLoadUrl = res.data.bussData.uploadUrl;
          this.information.videoKey = res.data.bussData.fileKey;
          let downloadUrl = res.data.bussData.downloadUrl;
          common.uploadFile(this.upLoadUrl,file,file.type,(res)=>{
              console.log('上传');
              console.log(res);
              this.videoUrl = downloadUrl;
              this.loading2 = false
          })
        })
      },
      //上传图片
      beforeAvatarUpload2(file) {
          this.loading2 = true
          let url = CONSTANT.SYSTEM.ADMINUPLOADFILE+`/${file.name.split(".")[1]}`;
          let sessionId = sessionStorage.getItem('sessionId');
          $.ajax({  url: url,  method: 'GET',
          data: {
            contentType: file.type
          },
          headers: {
            sessionId: sessionId,
          }}).success((res)=>{
            console.log('得到图片key',res.data.bussData.fileKey);
            this.upLoadUrl = res.data.bussData.uploadUrl;
            this.information.imageKey = res.data.bussData.fileKey;
            let downloadUrl = res.data.bussData.downloadUrl;
            common.uploadFile(this.upLoadUrl,file,file.type,(res)=>{
                console.log('上传');
                console.log(res);
                this.imgUrl = downloadUrl;
                this.loading2 = false
            })
          })
      },
    }
  }
</script>

<style scoped lang="scss">
#upDate{
  width:100%;
  height:100%;
  background: #fff;
  color: rgba(16, 16, 16, 1);
  font-size: 16px;
  font-family: Microsoft Yahei;
}
.viewWindos{
  margin-top: 40px;
  width: 328px;
  height: 180px;
  line-height: 41px;
  color: rgba(16, 16, 16, 1);
  font-size: 28px;
  text-align: center;
  font-family: Roboto;
  border: 1px solid rgba(187, 187, 187, 1);
  margin-left: 250px;
  .el-form-item__content{
     margin-left: 0;
  }
}
.viewWindos .el-form-item__content, .avatar-uploader{
  height: 100%;
  width:100%;
}
.avatar-uploader>div>i{
  width: 328px;
  height:180px;
  text-align: center;
  line-height:180px;
}
.avatar{
  width: 328px;
  height:180px;
}
.el-form-item{
  height: 100%;
  width:100%;
  margin:0;
}
.el-form-item__content{
  margin: 0!important;
}
.upVideo{
  float: left;
}
  .pageSwiper{
    padding-top:20px;
    padding-left:20px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    text-align: left;
    font-family: PingFangSC-regular;
  }
  .swiper-img{
    height:80px;
    padding-left:164px;
    margin-top:10px;
  }
  .swiper-img>span{
    display: block;
    float: left;
    padding-right:30px;
    line-height:80px;

  }
  .put{
    float: left;
    width:180px;
    margin-top:18px;
  }
  .endit-vid{
    margin-top:30px;
  }
  .show-video{
    line-height:100px;
    margin-top:20px;
    padding-left:164px;
  }
  .show-video>span{
    margin-right:30px;
    float: left;
  }
  .qued{
    line-height:160px;
    text-align: center;
    padding-bottom:60px;
  }
</style>
