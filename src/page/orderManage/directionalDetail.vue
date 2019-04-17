<template>
  <div class="storeAdmin"
    v-loading="loading2"
    element-loading-text="拼命上传中..."
    element-loading-spinner="el-icon-loading"
  >
    <div class="productName">
      <span class="sp1">商品名称：</span>
      <el-input class="put" v-model="input" placeholder="请输入"></el-input>
    </div>
    <el-form :model="information" :rules="rules" ref="information" label-width="120px" class="">
    <div class="productImg">
     <span class="sp2">配图</span>
     <el-form-item prop="imageKey">
        <el-upload class="avatar-uploader"
          :action="upLoadUrl1"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload2">
          <img v-if="imgUrl" :src="imgUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-form-item>
    </div>
    <div class="productBigImg">
      <span class="sp3">图文详情</span>
       <el-form-item label="" prop="content" style="margin-top: 40px;">
          <bg-editor
            :minHeight="250"
            :uploadUrl="upLoadUrl"
            :content="information.content"
            @editorData="editorInfo"
            >
          </bg-editor>
      </el-form-item>
    </div>
    <div class="productSelet">
      <span class="sp4">商品所属分类</span>
      <el-select @change="handleChange" v-model="value" placeholder="文胸">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
          >
        </el-option>
     </el-select>
    </div>
    <div class="buttons">
      <el-button class="but" size="mini" type="primary"
      @click="submit('information')"
      >保存</el-button>
      <el-button
      size="mini"
      type="primary"
      @click="back()"
      >
      返回
      </el-button>
    </div>
    </el-form>
    <div class="yuan"></div>
  </div>
</template>

<script>
import CONSTANT from "../../constant/constant.js";
let common = require("../../common.js");
export default {
  data() {
    return {
      input: '',
      options: [],
        value: '',
        upLoadUrl:'',
        upLoadUrl1: '',
        imgUrl:'',
        value:'',
        rules: {
        // content:[
        //   { required: true, message: '请输入内容', trigger: 'blur' },
        // ],
        imageKey:[
              { required: true, message: '请上传图片', trigger: 'blur' },
          ],
        },
        information: {
          content:'',
          imageKey:'',
        },
        loading2:false,
        categoryId:'',
    }
  },
  components:{
    'bg-editor':()=>import('../common/bg-editor.vue')
  },
  mounted(){
    this.handleChange()
    this.id = this.$router.currentRoute.query.id;
    if (this.id) {
      this.getList();
    }
  },
  methods: {
    editorInfo(val){
      this.information.content = val;
      console.log(val);
    },
    // 选择发生改变
    handleChange(){
       let url = CONSTANT.CATEGORY.LIST;
      common.postNoSess(url, null, null, res => {
        let data = res.data;

      var newData = data.bussData.map(item =>{
              return {
                name:item.name,
                id:item.id
              }
        })
        this.options = newData;
      });
    },
    //获取信息列表数据
    getList() {
      let url = CONSTANT.PRODUCT.DETAIL + `?id=${this.id}`;
      common.postNoSess(url, null, null, res => {
        let data = res.data;
        console.log(data.bussData);
        this.input = data.bussData.name;
        this.imgUrl = data.bussData.categoryImage2Link;
        this.information.content = data.bussData.content;
        this.information.imageKey = data.bussData.imageKey;
        this.value = data.bussData.categoryName;
        console.log(this.information.content);
      });
    },
    // 确定保存
    submit(formName){
      this.$refs[formName].validate((valid) => {
        this.getList()
        let data = null;
      if (valid) {
          this.loading = true;
          let url = '';
          if(this.id){url = CONSTANT.PRODUCT.UPDATE;
             data = {
              categoryId: this.id,
              content:this.information.content,
              imageKey:this.information.imageKey,
              name:this.input,
              id:this.id
           };
          }else{url = CONSTANT.PRODUCT.INSERT;
            data = {
                categoryId: this.value,
                content:this.information.content,
                imageKey:this.information.imageKey,
                name:this.input,
            };
          }
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
                    this.$router.push("/directionalList");
                  }, 2000);
              } else {
                  this.$message({
                      type: 'error',
                      message: res.data.errMsg
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
        this.upLoadUrl1 = res.data.bussData.uploadUrl;
        this.information.imageKey = res.data.bussData.fileKey;
        let downloadUrl = res.data.bussData.downloadUrl;
        common.uploadFile(this.upLoadUrl1,file,file.type,(res)=>{
            this.imgUrl = downloadUrl;
            this.loading2 = false;
        })
      })
    },
    back(){
    this.$router.push({path:'/directionalList'});
  },
}
}
</script>

<style scoped>
@import '/sys/static/bootstrap.css';
  .storeAdmin{
    height:100%;
    width:100%;
    background: #fff;
    padding-left:50px;
    overflow: hidden;
  }
  .productName{
    width:100%;
  }
  .sp1{
    float: left;
    background: #fff;
    margin-top:28px;
    margin-right:70px;
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
    font-family: SourceHanSansSC-regular;
  }
  .put{
  float: left;
  width:180px;
  margin-top:18px;
  }
  .productImg{
    float: left;
    height:120px;
    width: 100%;
    padding-top:44px;
  }
  .productImg .avatar{
    width: 200px;
    height: 120px;
  }
  .sp2{
    margin-right:100px;
    margin-bottom:30px;
  }
  .avatar-uploader{
    width: 200px;
    height: 120px;
  }
  .productBigImg{
    float: left;
    padding-top: 40px;
  }
  .productBigImg>img{
    width: 300px;
    height: 200px;
    margin-left:66px;
  }
  .productSelet{
    float: left;
    padding-top:50px;
    width:100%;
  }
  .sp4{
    padding-right:60px;
  }
  .buttons{
    float: left;
    padding-top: 50px;
    padding-left:200px;
  }
</style>

