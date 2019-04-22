<template>
  <div id="upDate"
  v-loading="loading2"
  element-loading-text="拼命上传中..."
  element-loading-spinner="el-icon-loading"
  >
  <el-form :model="information" :rules="rules" ref="information" label-width="120px" class="">
    <header>
      <p class="pageSwiper">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页轮播图</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/">编辑</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </p>
    </header>
    <div class="swiper-img">
      <span>轮播图图片</span>
     <el-form-item prop="imageKey">
        <el-upload class="avatar-uploader"
          :action="upLoadUrl"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload2">
          <img width="120" height="160" v-if="imgUrl" :src="imgUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </div>
    <div class="show-banner">
      <span>是否展示</span>
      <el-select v-model="value" placeholder="否">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="qued">
      <el-button  class="but-banner" type="primary"  @click="submit('information')">确定</el-button>
    </div>
    </el-form>
  </div>
</template>

<script>
import CONSTANT from "../../constant/constant.js";
let common = require("../../common.js");
  export default {
    data() {
      return {
         options: [
           {
            value: '是',
            label: '是'
          },
          {
            value: '否',
            label: '否'
          },
        ],
         value: '否',
         upLoadUrl: "",
         id:'',
         bannerKey: '',
         imgUrl: '',
         enable: false,
         bannerFileId: '',
         loading2: false,
        information: {
          imageKey:'',
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

    //轮播图片上传
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
            this.imgUrl = downloadUrl;
            this.loading2 = false
        })
      })
    },
      // 获取信息
    getDetail(){
      let url = CONSTANT.SWIPERMANAGE.FINDLIST+`?id=${this.id}`;
        common.postNoSess(url,null,null,(res)=>{
          console.log(res);
          let data = res.data.bussData;
          console.log(res);
          this.value = res.data.bussData.enable ? '是' : '否';
          this.bannerLink = res.data.bussData.bannerLink;
          this.bannerKey = res.data.bussData.bannerKey;
          this.imgUrl = res.data.bussData.bannerLink;
          // 将imageKey  videoKey 保存
          this.information.imageKey = res.data.bussData.imageKey;
      });
    },
    // 确定提交
    submit(formName){
        this.$refs[formName].validate((valid) => {
          console.log(formName);
          valid = true;
        if (valid) {
            this.loading = true;
            let url = '';
            if(this.id){url = CONSTANT.SWIPERMANAGE.UPDATE;}else{url = CONSTANT.SWIPERMANAGE.FINDDETAIL;}
             if(this.value == '是'){
                this.enable = true;
              } else if (this.value == '否') {
                this.enable = false;
              }
            let data = {
                bannerKey:this.information.imageKey,
                enable: this.enable,
                id:this.id
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
                      this.$router.push("/");
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
    }
  }
</script>

<style scoped>
#upDate {
  width: 100%;
  height: 100%;
  background: #fff;
  color: rgba(16, 16, 16, 1);
  font-size: 16px;
  font-family: Microsoft Yahei;
}
.avatar-uploader{
  line-height:160px;
}
.pageSwiper {
  padding-top: 60px;
  padding-left: 20px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  text-align: left;
  font-family: PingFangSC-regular;
}
.swiper-img {
  height: 160px;
  padding-left: 164px;
  margin-top: 80px;
  line-height: 160px;
}
.avatar-uploader-icon{
  border:1px dotted #ccc;
  width:120px;
  height:160px;
  text-align: center;
  line-height: 160px;
}
.swiper-img > span {
  display: block;
  float: left;
  padding-right: 64px;
  line-height: 120px;
}
/* .el-button {
  margin-top: 50px;
} */
.show-banner {
  padding-top: 61px;
  padding-left: 164px;
  padding-bottom: 113px;
}
.show-banner > span {
  margin-right: 30px;
}
.but-banner {
  display: block;
  margin: 0 auto;
}
.qued {
  padding-bottom: 60px;
}
</style>
