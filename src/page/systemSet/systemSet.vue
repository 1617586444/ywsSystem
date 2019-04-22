<template>
  <div
   v-loading="loading2"
    element-loading-text="拼命上传中..."
    element-loading-spinner="el-icon-loading"
  >
    <p class="pageSwiper">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/imgTextSet' }">/&nbsp;联系我们&nbsp;/</el-breadcrumb-item>
      </el-breadcrumb>
    </p>
    <div class="imgText">
      <div class="imgTextLeft">
        <div class="pageCode">
          <span class="color">首页二维码</span>
          <el-upload
            class="avatar-uploader"
            :action="upLoadUrl"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img width="120" height="80" v-if="imgUrl" :src="imgUrl" class="avatar-sys">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="catStore">
          <span class="color">天猫商城</span>
          <el-upload
              class="avatar-uploader"
              :action="upLoadUrl2"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload2"
            >
            <img width="120" height="80" v-if="imgUrl2" :src="imgUrl2" class="avatar-sys">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="linkto">
          <el-input v-model="link" v-on:blur="handleVal" class="but-sys" size="mini" placeholder="https://list.tmall.com/search_product.htm?q=%D2%C1%CE%AC%CB%B9&type=p&vmarket=&spm=875.7931836%2FB.a2227oh.d100&from=mallfp..pc_1_searchbutton"></el-input>
          <span>跳转链接</span>
        </div>
        <div class="contactMe">
          <span class="name color">联系我们</span>
          <div class="callInfo">
            <div class="hotCall">
              <span>全国统一客服热线：</span>
              <el-input v-model="phone" v-on:blur="handleHot" class="but2" size="mini" placeholder="0755-45456748"></el-input>
            </div>
            <div class="hotCall">
              <span>服务时间：</span>
              <el-input v-model="time" v-on:blur="handleTime" class="but2" size="mini" placeholder="07:00-22:00"></el-input>
            </div>
            <div class="hotCall">
              <span>公司地址：</span>
              <el-input v-model="address"  v-on:blur="handleAddress" class="but2" size="mini" placeholder="广东省"></el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="imgTextRight">
        <div class="pageShowVideo">
          <span class="color">首页展示视频</span>
          <el-upload
            class="avatar-uploader"
            :action="upLoadUrl3"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload3"
          >
            <img  width="120" height="80" v-if="imgUrl3" :src="imgUrl3" class="avatar-sys">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <el-upload
            class="upload-demo upVideo"
            :action="upLoadUrl4"
            :before-upload="beforeAvatarUpload4"
            :file-list="fileList"
            >
            <el-button size="small" type="primary">点击更换视频</el-button>
          </el-upload>
        </div>
        <div class="modelUpda">
          <span class="color">首页-模块图片更换</span>
          <span class="minColor">点击图片进行编辑更换</span>
        </div>
        <div class="updateList">
          <ul class="myUl">
            <li class="UlList">
              <el-tag>依品鉴赏</el-tag>
              <el-upload
              class="avatar-uploader"
              :action="upLoadUrlModel"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload5"
            >
              <img  width="120" height="80" v-if="imgUrlModel" :src="imgUrlModel" class="avatar-sys">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            </li>
            <li class="UlList">
              <el-tag>内衣研究院 </el-tag>
              <el-upload
              class="avatar-uploader"
              :action="upLoadUrlModel2"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload6"
            >
              <img  width="120" height="80" v-if="imgUrlModel2" :src="imgUrlModel2" class="avatar-sys">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            </li>
            <li class="UlList">
              <el-tag>  艺术伊维斯</el-tag>
              <el-upload
                class="avatar-uploader"
                :action="upLoadUrlModel3"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload7"
              >
                <img  width="120" height="80" v-if="imgUrlModel3" :src="imgUrlModel3" class="avatar-sys">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </li>
            <li class="UlList">
              <el-tag>  VIP中心</el-tag>
              <el-upload
                class="avatar-uploader"
                :action="upLoadUrlModel4"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload8"
              >
                <img  width="120" height="80" v-if="imgUrlModel4" :src="imgUrlModel4" class="avatar-sys">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </li>
            <li class="UlList">
              <el-tag>    艺术插画</el-tag>
              <el-upload
                class="avatar-uploader"
                :action="upLoadUrlModel5"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload9"
              >
                <img  width="120" height="80" v-if="imgUrlModel5" :src="imgUrlModel5" class="avatar-sys">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </li>
          </ul>
        </div>
        <div class="storeTopImg">
          <span class="color">门店置顶图</span>
          <el-upload
            class="avatar-uploader"
            :action="upLoadUrlShop"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload10"
          >
            <img  width="120" height="80" v-if="imgUrlShop" :src="imgUrlShop" class="avatar-sys">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CONSTANT from "../../constant/constant.js";
let common = require("../../common.js");
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        upLoadUrl: "",
        upLoadUrl2: "",
        upLoadUrl3: "",
        upLoadUrl4: "",
        upLoadUrlModel: "",
        upLoadUrlModel2: "",
        upLoadUrlModel3: "",
        upLoadUrlModel4: "",
        upLoadUrlModel5: "",
        upLoadUrlShop: "",
        imgUrlModel:'',
        imgUrlModel2:'',
        imgUrlModel3:'',
        imgUrlModel4:'',
        imgUrlModel5:'',
        imgUrlShop:'',
        videoUrl: "",
        imgUrl: "",
        imgUrl2: "",
        imgUrl3: "",
        link: "",
        time: "",
        address: "",
        phone: "",
        fileList:[],
        dialogImageUrl: '',
        dialogVisible: false,
        loading2: false,
        information:[
          {
            imageKey1:'',
            imageKey2:'',
            imageKey3:'',
            imageKeyModel:'',
            imageKeyModel2:'',
            imageKeyModel3:'',
            imageKeyModel4:'',
            imageKeyModel5:'',
            imageKeyShop:'',
            videoUrl: "",
          }
        ],
      };
    },
    mounted(){
      // 获取列表数据
      this.getList()


    },
    methods: {
      // 调用跳转链接
      handleVal(){
      this.setLinkInfo(this.link,'TMALL_LINK')
      },
      handleHot(){
        this.setLinkInfo(this.phone,'CONTACT_PHONE')
      },
      handleTime(){
        console.log('失去光标了');
        this.setLinkInfo(this.time,'CONTACT_SERVICE')
      },
      handleAddress(){
        this.setLinkInfo(this.address,'CONTACT_ADDRESS')
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
        handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    //首页二维码上传
      beforeAvatarUpload(file) {
        this.loading2 = true;
        let url = CONSTANT.SYSTEM.ADMINUPLOADFILE + `/${file.name.split(".")[1]}`;
        let sessionId = sessionStorage.getItem("sessionId");
        $.ajax({
          url: url,
          method: "GET",
          data: {
            contentType: file.type
          },
          headers: {
            sessionId: sessionId
          }
        }).success(res => {
          console.log("得到图片key", res.data);
          this.upLoadUrl = res.data.bussData.uploadUrl;
          this.information.imageKey1 = res.data.bussData.fileKey;
          let downloadUrl = res.data.bussData.downloadUrl;
          common.uploadFile(this.upLoadUrl, file, file.type, res => {
            console.log("上传完成");
            this.imgUrl = downloadUrl;
            this.loading2 = false;
            let url2 = CONSTANT.SYSTEMSET.UPDATE;
            let data = {
              type:'INDEX_QRCODE',
              value:this.information.imageKey1
            }
            let param = JSON.stringify(data);
            common.postNoSess(url2,param,null,res=>{
            })
          });
        });
      },
    //天猫商城
      beforeAvatarUpload2(file) {
        this.loading2 = true;
        let url = CONSTANT.SYSTEM.ADMINUPLOADFILE + `/${file.name.split(".")[1]}`;
        let sessionId = sessionStorage.getItem("sessionId");
        $.ajax({
          url: url,
          method: "GET",
          data: {
            contentType: file.type
          },
          headers: {
            sessionId: sessionId
          }
        }).success(res => {
          console.log("得到图片key2", res.data);
          this.upLoadUrl = res.data.bussData.uploadUrl;
          this.information.imageKey2 = res.data.bussData.fileKey;
          let downloadUrl = res.data.bussData.downloadUrl;
          common.uploadFile(this.upLoadUrl, file, file.type, res => {
            console.log("上传");
            this.imgUrl2 = downloadUrl;
            this.loading2 = false;
            let url3 = CONSTANT.SYSTEMSET.UPDATE;
            let data = {
              type:'TMALL_IMAGE',
              value:this.information.imageKey2
            }
            let param = JSON.stringify(data);
            common.postNoSess(url3,param,null,res=>{
            })
          });
        });
      },
      // 首页视频展示省略图
      beforeAvatarUpload3(file) {
        this.loading2 = true;
        let url = CONSTANT.SYSTEM.ADMINUPLOADFILE + `/${file.name.split(".")[1]}`;
        let sessionId = sessionStorage.getItem("sessionId");
        $.ajax({
          url: url,
          method: "GET",
          data: {
            contentType: file.type
          },
          headers: {
            sessionId: sessionId
          }
        }).success(res => {
          console.log("得到图片key3", res.data);
          this.upLoadUrl = res.data.bussData.uploadUrl;
          this.information.imageKey3 = res.data.bussData.fileKey;
          let downloadUrl = res.data.bussData.downloadUrl;
          common.uploadFile(this.upLoadUrl, file, file.type, res => {
            this.imgUrl3 = downloadUrl;
            this.loading2 = false;
            let url4 = CONSTANT.SYSTEMSET.UPDATE;
            let data = {
              type:'INDEX_IMAGE_VIDEO',
              value:this.information.imageKey3
            }
            let param = JSON.stringify(data);
            common.postNoSess(url4,param,null,res=>{
            })
          });
        });
      },
      //  上传视频
      beforeAvatarUpload4(file) {
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
                this.videoUrl = downloadUrl;
                this.loading2 = false
                let url5 = CONSTANT.SYSTEMSET.UPDATE;
                let data = {
                  type:'INDEX_VIDEO',
                  value:this.information.videoKey
                }
                let param = JSON.stringify(data);
                common.postNoSess(url5,param,null,res=>{
                })
            })
          })
      },
      //  模块图片
      beforeAvatarUpload5(file) {
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
            this.upLoadUrl = res.data.bussData.uploadUrl;
            this.information.imageKeyModel = res.data.bussData.fileKey;
            let downloadUrl = res.data.bussData.downloadUrl;
            common.uploadFile(this.upLoadUrl,file,file.type,(res)=>{
                this.imgUrlModel = downloadUrl;
                this.loading2 = false
                let url6 = CONSTANT.SYSTEMSET.UPDATE;
                let data = {
                  type:'INDEX_IMAGE_PRODUCT',
                  value:this.information.imageKeyModel
                }
                let param = JSON.stringify(data);
                common.postNoSess(url6,param,null,res=>{
                })
            })
          })
      },
      //  模块图片
      beforeAvatarUpload6(file) {
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
            this.information.imageKeyModel2 = res.data.bussData.fileKey;
            let downloadUrl = res.data.bussData.downloadUrl;
            common.uploadFile(this.upLoadUrl,file,file.type,(res)=>{
                this.imgUrlModel2 = downloadUrl;
                this.loading2 = false
                let url7 = CONSTANT.SYSTEMSET.UPDATE;
                let data = {
                  type:'INDEX_IMAGE_RESEARCH',
                  value:this.information.imageKeyModel2
                }
                let param = JSON.stringify(data);
                common.postNoSess(url7,param,null,res=>{
                })
            })
          })
      },
      //  模块图片
      beforeAvatarUpload7(file) {
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
            this.information.imageKeyModel3 = res.data.bussData.fileKey;
            let downloadUrl = res.data.bussData.downloadUrl;
            common.uploadFile(this.upLoadUrl,file,file.type,(res)=>{
                this.imgUrlModel3 = downloadUrl;
                this.loading2 = false
                let url8 = CONSTANT.SYSTEMSET.UPDATE;
                let data = {
                  type:'INDEX_IMAGE_ABOUT',
                  value:this.information.imageKeyModel3
                }
                let param = JSON.stringify(data);
                common.postNoSess(url8,param,null,res=>{
                })
            })
          })
      },
      //  模块图片
      beforeAvatarUpload8(file) {
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
            this.information.imageKeyModel4 = res.data.bussData.fileKey;
            let downloadUrl = res.data.bussData.downloadUrl;
            common.uploadFile(this.upLoadUrl,file,file.type,(res)=>{
                this.imgUrlModel4 = downloadUrl;
                this.loading2 = false
                let url9 = CONSTANT.SYSTEMSET.UPDATE;
                let data = {
                  type:'INDEX_IMAGE_VIP',
                  value:this.information.imageKeyModel4
                }
                let param = JSON.stringify(data);
                common.postNoSess(url9,param,null,res=>{
                })
            })
          })
      },
      //  模块图片
      beforeAvatarUpload9(file) {
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
            this.information.imageKeyModel5 = res.data.bussData.fileKey;
            let downloadUrl = res.data.bussData.downloadUrl;
            common.uploadFile(this.upLoadUrl,file,file.type,(res)=>{
                this.imgUrlModel5  = downloadUrl;
                this.loading2 = false
                let url10 = CONSTANT.SYSTEMSET.UPDATE;
                let data = {
                  type:'INDEX_IMAGE_ART',
                  value:this.information.imageKeyModel5
                }
                let param = JSON.stringify(data);
                common.postNoSess(url10,param,null,res=>{
                })
            })
          })
      },
      // 门店置顶
      beforeAvatarUpload10(file) {
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
            this.information.imageKeyShop = res.data.bussData.fileKey;
            let downloadUrl = res.data.bussData.downloadUrl;
            common.uploadFile(this.upLoadUrl,file,file.type,(res)=>{
                console.log('上传');
                this.imgUrlShop = downloadUrl;
                this.loading2 = false
                let url11 = CONSTANT.SYSTEMSET.UPDATE;
                let data = {
                  type:'SHOP_IMAGE',
                  value:this.information.imageKeyShop
                }
                let param = JSON.stringify(data);
                common.postNoSess(url11,param,null,res=>{
                })
            })
          })
      },
      //获取列表数据
      getList() {
        let url = CONSTANT.SYSTEMSET.PAGELIST;
        common.postNoSess(url, null, null, res => {
          console.log(res);
          let data = res.data;
          this.time = data.bussData.contact.contactService;
          this.link = data.bussData.tmallLink;
          this.imgUrl2 = data.bussData.tmallImage;
          this.imgUrl = data.bussData.indexQrcode;
          this.imgUrl3 = data.bussData.indexImageVideo;
          this.imgUrlModel = data.bussData.indexImageProduct;
          this.imgUrlModel2 = data.bussData.indexImageResearch;
          this.imgUrlModel3 = data.bussData.indexImageAbout;
          this.imgUrlModel4 = data.bussData.indexImageVIP;
          this.imgUrlModel5 = data.bussData.indexImageArt;
          this.imgUrlShop = data.bussData.shopImage;
          this.videoUrl = data.bussData.indexVideo;
          this.address = data.bussData.contact.contactaddress;
          this.phone = data.bussData.contact.contactPhone;

          // for(var val of data.bussData.contact){
          //   console.log(val);
          // }
        });
      },
      // 设置跳转链接
      setLinkInfo(name,type){
        let url = CONSTANT.SYSTEMSET.UPDATE;
        let data = {
          type:type,
          value:name
        }
        let param = JSON.stringify(data);
        common.postNoSess(url,param,null,res=>{
          console.log(res);
        })
      }
    }
  }
</script>

<style scoped>
  .imgText{
    display: flex;
    height: 608px;
  }
  .imgTextLeft{
    border-right:1px solid #ccc;
    flex: 1 50%;
  }
  .imgTextRight{
    flex: 1 50%;
  }
  .pageCode{
    display: flex;
    justify-content:space-around;
    padding-bottom: 40px;
  }
  .catStore{
    display: flex;
    justify-content:space-around;
  }
  .linkto{
    height: 36px;
  }
  .linkto>span{
    float: right;
    padding-top:40px;
  }
  .but-sys{
    width: 200px;
    padding-top:40px;
    margin-left:10px;
    margin-right:15%;
    float: right;
  }
  .but2{
    width: 120px;
    margin-left:10px;
    margin-right:10px;
    float: right;
  }
  .contactMe{
    margin-top:60px;
    display: flex;
    justify-content:space-around;
  }
  .color{
    color: rgba(16, 16, 16, 1);
    font-size: 18px;
    font-family: SourceHanSansSC-bold;
  }
  .hotCall{
    height: 44px;
    padding-bottom:14px;
  }
  .pageShowVideo{
    display: flex;
    justify-content:space-around ;
    position: relative;
  }
  .upload-demo{
    margin-top:30px;
  }
  .modelUpda{
    height: 27px;
    margin-top: 20px;
    padding-left:40px;
  }
  .minColor{
    color: rgba(16, 16, 16, 1);
    font-size: 13px;
    font-family: SourceHanSansSC-regular;
  }
  .myUl{
    display: flex;
    justify-content:space-around;
    flex-wrap:wrap;
  }
  .UlList{
    flex: 1 50%;
    display: flex;
    justify-content:space-around;
    align-items: center;
    margin-bottom:12px;
    /* flex-wrap:wrap; */
  }
  .el-upload {
    width:120px;
    height: 80px;
    position: relative;
  }
  .el-icon-plus{
    position: absolute;
    top:25px;
    left:45px;
  }
  .finallyModel{
    margin-right:284px;
  }
  .storeTopImg{
    width:380px;
    display: flex;
    justify-content:space-around;
  }
  .ShowImg{
    width: 120px;
    height: 80px;
    position: absolute;
    top:0px;
    left:238px;
  }
  .hideUp{
    opacity: 0;
    z-index:99;
  }
</style>
