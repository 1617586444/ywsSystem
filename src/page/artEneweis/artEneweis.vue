<template>
  <div class="contain"
  v-loading="loading"
  element-loading-text="拼命上传中..."
  element-loading-spinner="el-icon-loading"
  >
    <div class="main">
      <div height="60">图文详情：</div>
      <el-form :model="information" :rules="rules" ref="information" label-width="20px" class>
        <el-form-item label prop="content">
          <bg-editor
            :minHeight="500"
            :uploadUrl="upLoadUrl"
            :content="information.content"
            @editorData="editorInfo"
          ></bg-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('information')" :loading="loading">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import CONSTANT from "../../constant/constant.js";
let common = require("../../common.js");
import $ from "jquery";
export default {
  data() {
    return {
      upLoadUrl: "",
      information: {
        content: ""
      },
      type: "about",
      isShow: true,
      rules: {},
      loading: false,
      url: "about"
    };
  },
  components: {
    "bg-editor": () => import("../common/bg-editor.vue")
  },
  mounted() {
    this.getDetail();
  },
  methods: {
       // 获取数据
    getDetail(){
        this.loading = true;
      let url = CONSTANT.ART.FINDVAL;
      common.postNoSess(url,null,null,(res)=>{
          this.loading = false;
          let data = res.data.bussData;
          console.log(data);
          this.information.content = data;
      });
      },
    editorInfo(val) {
      this.information.content = val;
    },
    editForm() {
      this.isShow = false;
    },
    // 确定保存
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          let url = CONSTANT.ART.SETVAL;
          let data = {
              value:this.information.content,
              type: this.type
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
              setTimeout(() => {
                // this.$router.push("/");
              }, 2000);
            } else {
              this.$message({
                type: "error",
                message: res.data.errMsg
              });
              this.loading = false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped >
@import "/static/bootstrap.css";
@import "/book/static/bootstrap.css";
.contain {
  margin-top: 20px;
  .header {
    height: 46px;
    padding-bottom: 10px;
    border-bottom: 1px solid #dedede;
    p {
      float: left;
      height: 36px;
      line-height: 36px;
      margin: 0 0 0 10px;
      font-size: 18px;
    }
  }
  .main {
    width: 500px;
    max-width: 1500px;
    margin: 20px 0 0 0px;
    clear: both;
    .modal-body {
      .note-image-input {
        display: block;
      }
    }
  }
}
.text-content {
  width: 648px;
  height: 546px;
  border: 1px solid #ccc;
  overflow: auto;
}
</style>
