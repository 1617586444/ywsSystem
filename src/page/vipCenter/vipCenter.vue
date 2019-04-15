<template>
  <div class="contain">
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
          <!-- <el-button  type="primary" @click="handleClick"  :loading="loading">退出</el-button> -->
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
  // mounted() {
  //   let sessionId = sessionStorage.getItem("sessionId");
  //   this.upLoadUrl =
  //     CONSTANT.URL.SYSTEM.ADMINUPLOADFILE + "?sessionId=" + sessionId;
  //   this.getContent();
  // },
  methods: {
    getContent() {
      let url = CONSTANT.SYSTEM.FINDSYSTEMINFO;
      let data = {};
      let param = JSON.stringify(data);
      common.requestAjax(url, param, null, res => {
        this.loading = false;
        let data = res.data.bussData;
        data.forEach(function(ele) {
          // console.log(ele.type,this.type);
          if (ele.type == this.type) {
            this.information.content = ele.content;
            // break;
          }
        }, this);
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
        console.log(this.input);
        if (valid) {
          this.loading = true;
          let url = CONSTANT.VIPCENTER.SETVAL;
          let data = {
              value:this.information.content,
              type: this.type
          }
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
    // handleClick() {
    //     this.$router.push('/');
    // },
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
