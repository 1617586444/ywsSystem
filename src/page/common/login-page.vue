<template>
    <div class="wrap">
        <div class="login-wrap">
            <div class="login-title">伊维斯后台</div>
            <div id="darkbannerwrap"></div>
            <input type="text" @keyup.enter="login" v-model="account" placeholder="请输入账号">
            <input type="password" @keyup.enter="login"  v-model="password" placeholder="请输入密码">
            <!-- <div class="login-tips">
                <router-link to="/rechargePassword">修改密码？</router-link>
            </div> -->
             <div class="login-button">
                <input class="btn btn-primary" value="登录"  type="button" @keyup.enter="login" @click="login">
            </div>
        </div>
    </div>
</template>

<script>
import CONSTANT from "../../constant/constant.js";
  let  common = require('../../common.js');
import Vue from 'vue'
import $ from 'jquery'
export default {
    name: 'login',
    data() {
        return {
            account:'',
            password:'',
        }
    },
    mounted(){
        // window.localStorage.removeItem('jwt');
        // Vue.http.options.headers.jwt = '';
    },
    methods:{
        login(){
             let url = CONSTANT.ADMIN.LOGIN;
             let param = {'loginName':this.account,'password':this.password };
            this.$http.post(url, param, {emulateJSON:true}).then(res => {
              let data = res.data;
                 if(data.status == 'success'){
                  // console.log(data.data.bussData);
                    this.$message({
                        type: 'success',
                        message: '登录成功!'
                    });
                    sessionStorage.setItem('sessionId',data.data.bussData);
                    sessionStorage.setItem('manager',this.account);

                    setTimeout(()=> {
                       // window.location.reload();
                       this.$router.push('/')
                    }, 1000);
                 }
                 else{
                    this.$message({
                         type: 'warning',
                         message:data.data.errMsg
                        //  message:'密码有误'
                    });
                 }
             }, res => {
                 // error callback
            });

        }
    }
}
</script>

<style scoped>
.wrap {
    height:100%;
    background: #fff;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    z-index: 999;
}

.login-wrap {
    position:relative;
    top:200px;
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
    padding: 18px 10px 18px 80px;
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

input[type=text], input[type=file], input[type=password], input[type=email], select {
    border: 1px solid #DCDEE0;
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
    margin-top: -15px;
    margin-bottom: 20px;
    text-align: right;
    text-decoration: none;
    color: #1b66c7;
    font-size: 16px;
    cursor: pointer;
}

.login-button{
    margin-top: 15px;
}

.login-button input{
    padding: 12px 0;
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
