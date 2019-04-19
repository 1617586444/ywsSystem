<template>
  <div
    class="classifyModf"
    v-loading="loading2"
    element-loading-text="玩命加载中..."
    element-loading-spinner="el-icon-loading"
  >
    <el-form :model="information" :rules="rules" ref="information" label-width="120px" class>
      <el-form-item prop="input">
        <div class="title">
          <span>标题</span>
          <el-input class="put" v-model="information.input" placeholder="请输入标题"></el-input>
        </div>
      </el-form-item>

      <el-form-item prop="imageKey1">
        <div class="illustration1">
          <span>配图1</span>
          <el-upload
            class="avatar-uploader"
            :action="upLoadUrl"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item prop="imageKey2">
        <div class="illustration2">
          <span>配图2</span>
          <el-upload
            class="avatar-uploader"
            :action="upLoadUrl"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload2"
          >
            <img v-if="imgUrl2" :src="imgUrl2" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="buttons">
          <el-button class="but" size="mini" type="primary" @click="submit('information')">保存</el-button>
          <el-button size="mini" type="primary" @click="back()">返回</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import CONSTANT from "@/constant/constant.js";
let common = require("@/common.js");
export default {
  data() {
    return {
      input: "",
      dialogImageUrl: "",
      dialogVisible: false,
      upLoadUrl: "",
      id: "",
      information: {
        imageKey1: "",
        imageKey2: "",
         input: "",

      },
      imgUrl: "",
      imgUrl2: "",
      rules: {
        input: [{ required: true, message: "请上输入文字", trigger: "blur" }],
        imageKey1: [{ required: true, message: "请上传图片", trigger: "blur" }],
        imageKey2: [{ required: true, message: "请上传图片", trigger: "blur" }]
      },
      loading2: true
    };
  },
  mounted() {
    this.id = this.$router.currentRoute.query.id;
    if (this.id) {
      this.getList();
      // console.log(this.id);
    }
  },
  methods: {
    //获取信息列表数据
    getList() {
      let url = CONSTANT.CATEGORY.DETAIL + `?id=${this.id}`;
      common.postNoSess(url, null, null, res => {
        let data = res.data;
        this.information= data.bussData;
        this.information.input = data.bussData.name;
        console.log(this.information.input);
        this.imgUrl = data.bussData.image1Link;
        this.imgUrl2 = data.bussData.image2Link;
        this.loading2 = false
      });
    },
    // 确定保存
    submit(formName) {
      this.$refs[formName].validate(valid => {
        console.log(this.information.image1Key);
        if (valid) {
          this.loading = true;
          let url = "";
          if (this.id) {
            url = CONSTANT.CATEGORY.UPDATE;
          } else {
            url = CONSTANT.CATEGORY.INSERT;
          }
          let data = {
            image1Key: this.information.imageKey1,
            image2Key: this.information.imageKey2,
            name: this.information.input
          };
          if (this.id) {
            data.id = this.id;
          }
          let param = JSON.stringify(data);
          common.postNoSess(url, param, null, res => {
            console.log("提交的结果", res);
            if (res.status == "success") {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              this.loading = false;
                this.$router.push("/classify");
            } else {
              this.$message({
                type: "error",
                message: "请添加完成信息！"
              });
              this.loading = false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //上传图片1
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
          console.log("上传");
          console.log(res);
          this.imgUrl = downloadUrl;
          this.loading2 = false;
        });
      });
    },
    //上传图片2
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
        console.log("得到图片key", res.data);
        this.upLoadUrl = res.data.bussData.uploadUrl;
        this.information.imageKey2 = res.data.bussData.fileKey;
        let downloadUrl = res.data.bussData.downloadUrl;
        common.uploadFile(this.upLoadUrl, file, file.type, res => {
          console.log(res);
          this.imgUrl2 = downloadUrl;
          this.loading2 = false;
        });
      });
    },
    back() {
      this.$router.push({ path: "/classify" });
    }
  }
};
</script>

<style scope>
.classifyModf {
  padding: 100px 0 0 100px;
}
.title {
  height: 30px;
}
.title > span {
  float: left;
  margin-top: 8px;
  padding-right: 90px;
}
.put {
  float: left;
  width: 180px;
}
.el-upload > img {
  width: 210px;
  height: 180px;
  margin-top: -50px;
}
.avatar-uploader {
  float: left;
}
.el-upload {
  border: 1px dotted #5c9eff;
  border-radius: 5px;
}
.el-input {
  height: 30px;
}
.illustration1 {
  height: 45px;
  margin-top: 42px;
}
.illustration1 > span {
  float: left;
  margin-top: 8px;
  padding-right: 85px;
}
.illustration2 {
  height: 45px;
  margin-top: 42px;
}
.illustration2 > span {
  float: left;
  margin-top: 8px;
  padding-right: 85px;
}
.el-upload {
  width: 200px;
  height: 43px;
  position: relative;
}
.el-icon-plus {
  position: absolute;
  top: 6px;
  left: 90px;
}
.buttons {
  float: left;
  padding-top: 100px;
  padding-left: 200px;
}
</style>
