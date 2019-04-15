<template>
  <div class="wrap">
    <div class="login-wrap">
      <div class="login-title">伊维斯后台-重置密码</div>
      <div id="darkbannerwrap"></div>
      <input type="text" @keyup.enter="login" v-model="oldPWD" placeholder=" 请输旧密码">
      <input type="password" @keyup.enter="login" v-model="newPWD" placeholder="请输入新密码">
      <input
        type="password"
        @keyup.enter="login"
        v-model="confirmNewPWD "
        placeholder="确认新密码"
        @keyup="confirmPass"
      >
      <div class="login-tips" v-if="tipToggle">两次输入不一致</div>
      <div class="login-button">
        <button class="btn btn-primary" type="button" @click="login">确认修改</button>
      </div>
    </div>
  </div>
</template>

<script>
import CONSTANT from "../../constant/constant.js";
let  common = require("../../common.js");
export default {
  name: "login",
  data() {
    return {
      oldPWD: "",
      newPWD: "",
      confirmNewPWD: "",
      tipToggle: false
    };
  },
  mounted() {},
  methods: {
    login() {
      let url = CONSTANT.ADMIN.UPDUSERPWD;
      let param = {
        oldPassword: this.oldPWD,
        newPassword: this.newPWD
      };
      let headers = {
        sessionId: sessionStorage.getItem('sessionId'),
      };
      common.post(url, param, headers, res => {
        // console.log(res);
        if (res.status == 'success') {
          this.$message({
            type: "success",
            message: "密码修改成功!"
          });
          setTimeout(() => {
            this.$router.push("/loginPage");
          }, 1500);
        } else {
          this.$message({
            type: "warning",
            message: res.data.errMsg
          });
        }
      });
    },
    confirmPass() {
      if (this.newPWD == this.confirmNewPWD) {
        this.tipToggle = false;
      } else {
        this.tipToggle = true;
      }
    }
  }
};
</script>

<style scoped>
.wrap {
  height: 100%;
  background: #fff;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  z-index: 999;
}

.login-wrap {
  position: relative;
  top: 200px;
  margin: 0px auto 0 auto;
  min-height: 420px;
  max-width: 420px;
  padding: 40px;
  background-color: #ffffff;
  border: solid #ccc 1px;
  border-radius: 4px;
  box-sizing: border-box;
}

.login-title {
  margin: 10px 0 0 -58px;
  padding: 18px 10px 18px 60px;
  background: #5c9eff;
  position: relative;
  color: #fff;
  font-size: 16px;
}

#darkbannerwrap {
  background: url(../../images/aiwrap.png);
  width: 18px;
  height: 10px;
  margin: 0 0 20px -58px;
  position: relative;
}

input[type="text"],
input[type="file"],
input[type="password"],
input[type="email"],
select {
  border: 1px solid #dcdee0;
  vertical-align: middle;
  border-radius: 3px;
  height: 50px;
  padding: 0px 16px;
  font-size: 14px;
  color: #555555;
  outline: none;
  width: 90%;
  margin-bottom: 25px;
}
.login-tips {
  margin-top: -20px;
  margin-bottom: 20px;
  text-align: right;
  font-size: 12px;
  color: red;
}
.login-button button {
  padding: 12px 24px;
  margin: 0px;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  width: 100%;
  cursor: pointer;
  color: #ffffff;
  background-color: #5c9eff;
  border-radius: 3px;
  border: none;
}
</style>
