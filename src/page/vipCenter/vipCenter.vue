<template>
  <div class="contain"
  v-loading="loading"
  element-loading-text="获取数据中..."
  element-loading-spinner="el-icon-loading"
  >
    <div class="main">
      <div style="margin-bottom:60px">图文详情：</div>
      <el-form :model="information" :rules="rules" ref="information" label-width="20px" class>
        <el-form-item label prop="content">
          <quill-editor
            ref="myTextEditor"
            :content="information.content"
            :options="editorOption"
            @change="onEditorChange($event)"
            >
        </quill-editor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('information')" :loading="loading">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import CONSTANT from "@/constant/constant.js";
let common = require("@/common.js");
export default {
  data() {
    return {
      upLoadUrl: "",
      editorOption:{},
      information: {
        content: ""
      },
      rules: {
        content:[
            { required: true, message: '请输入内容', trigger: 'blur' },
          ],
      },
      loading: false,
    };
  },
  mounted() {
    this. getDetail()
  },
  methods: {
    // 获取数据
    getDetail(){
        this.loading = true;
        let url = CONSTANT.VIPCENTER.FINDVAL;
        common.postNoSess(url,null,null,(res)=>{
          this.loading = false;
          let data = res.data.bussData;
          this.information.content = data;
      });
    },
      onEditorBlur(e){//失去焦点事件
      },
      onEditorFocus(ele){//获得焦点事件
      },
      onEditorChange(e){//内容改变事件
        this.information.content = e.html;
        // console.log(e.html);
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
    },
    editorInfo(val) {
      this.information.content = val;
    },
  }
};
</script>

<style lang="scss" scoped >
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
    width: 800px;
    max-width: 1500px;
    margin: 20px auto;
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
