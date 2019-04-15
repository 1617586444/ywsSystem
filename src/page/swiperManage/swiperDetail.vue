<template>
  <div id="upDate">
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
      <img :src="imgUrl" alt>
      <el-upload
        class="upload-demo"
        :action="upLoadUrl"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>
    <div class="show">
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
      <el-button  class="but" type="primary" @click="confirmAdd()">确定</el-button>
    </div>
  </div>
</template>

<script>
import CONSTANT from "../../constant/constant.js";
let common = require("../../common.js");
  export default {
    data() {
      return {
        fileList: [],
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
         enable: false,
         bannerFileId: '',
         bannerLink: "",
         loading: null,
         isDeleted: '',
         imgUrl:"http://enweis.oss-cn-zhangjiakou.aliyuncs.com/icebartech-enweis-test/190413105018-180.jpg?Expires=1555125633&OSSAccessKeyId=LTAIuTuWoMJMrojO&Signature=GbKBJMVjqAsxnfLA30vsb7348iI%3D"
      };
    },
  mounted() {
        this.id  = this.$router.currentRoute.query.id;
        this.isDeleted  = this.$router.currentRoute.query.isDeleted;
        console.log(this.$router.currentRoute.query.id);
        if(this.isDeleted == 'n'){
            this.getAdd();
        }
    },
  methods: {
    //轮播图片上传
    beforeAvatarUpload(file) {
      this.loading = false
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
            this.loading = true;
        });
      }).fail((error) =>{
        console.log(error);
      })
    },
    // 编辑
    getAdd(isHide) {
      let url = '';
      let data = '';
      let param = '';
      // if(this.id){ data.id = this.id};
      if(this.isDeleted == 'n') {
        url = CONSTANT.SWIPERMANAGE.UPDATE;
        data = {
          bannerKey: this.bannerKey,
          bannerLink:this.bannerLink,
          id: this.id,
          enable:this.enable
        }
      }else{
        url = CONSTANT.SWIPERMANAGE.FINDDETAIL;
        data = {
          bannerKey: this.bannerKey,
          enable: isHide
        }
      }
      param =JSON.stringify(data)
      common.post(url,param,null,res=> {
        // 保存 id
        this.bannerFileId = res.data.bussData;
        // 获取图片地址
        this.getBannerLink();
      },error =>{
        console.log(error);
      })
    },
    // 获取banner图地址
    getBannerLink() {
      let url = CONSTANT.SWIPERMANAGE.FINDLIST+`?id=${this.id}`;
      common.post(url,null,null,res=> {
        this.bannerLink = res.data.bussData.bannerLink;
        this.imgUrl = res.data.bussData.bannerLink;
          console.log(res.data.bussData.bannerLink);
      })
    },
    // 确定提交
    confirmAdd() {
      if(this.value == '是') {
        this.enable = true;
      } else if (this.value == '否') {
        this.enable = false;
      }
      if (this.loading) {
      //  图片预览已加载
      this.getAdd(this.enable);
      this.$message({
        type: "success",
        message: "修改成功!"
      });
      setTimeout(() => {
        this.$router.push("/");
      }, 2000);
      }else {
        this.$message({
          type: "error",
          message: "图片未加载完成或者未择图片!"
        });
      }
    },
    }
  }
</script>

<style scope>
#upDate {
  width: 100%;
  height: 100%;
  background: #fff;
  color: rgba(16, 16, 16, 1);
  font-size: 16px;
  font-family: Microsoft Yahei;
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
  height: 120px;
  padding-left: 164px;
  margin-top: 115px;
}
.swiper-img > span {
  display: block;
  float: left;
  padding-right: 64px;
  line-height: 120px;
}
.swiper-img > img {
  width: 200px;
  height: 120px;
  float: left;
  margin-right: 30px;
}
.el-button {
  margin-top: 50px;
}
.show {
  margin-top: 51px;
  padding-left: 164px;
  padding-bottom: 113px;
}
.show > span {
  margin-right: 30px;
}
.but {
  display: block;
  margin: 0 auto;
}
.qued {
  padding-bottom: 60px;
}
</style>
