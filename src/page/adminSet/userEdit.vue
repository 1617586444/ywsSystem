<template>
    <div class="contain-edit">
        <div class="header">
           <p>新增/修改账户</p>
       </div>
       <div class="main">
           <el-form :model="user" :rules="rules" ref="user" label-width="120px" class="">
                <el-form-item label="头像" prop="iconImg">
                  <el-upload class="avatar-uploader"
                    :action="upLoadUrl"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload2">
                    <img width="80" height="80" v-if="imgUrl" :src="imgUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                </el-form-item>
                <el-form-item label="账号" prop="loginName" >
                    <el-input v-model="user.loginName" placeholder="单行输入"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="userName" >
                    <el-input v-model="user.userName" placeholder="单行输入"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="passwd" >
                    <el-input v-model="user.passwd" placeholder="新密码/重复新密码"></el-input>
                </el-form-item>
                <el-form-item label="重复密码" prop="confirmPasswd">
                    <el-input v-model="user.confirmPasswd" placeholder="新密码/重复新密码"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="roleName">
                    <el-select filterable v-model='user.roleName'  @change="getRoleId" placeholder='-请选择-'>
                        <el-option  v-for="item in user.roleList"   :key="item.id"   :label="item.roleName"  :value="item.id"></el-option>
                    </el-select>
                <i class="el-icon-circle-plus-outline" @click="show =!show"></i>
                </el-form-item>
                <el-form-item  prop="roleName" v-if="show">
                    <el-select filterable v-model='user.roleName'  @change="getRoleId" placeholder='-请选择-'>
                        <el-option   v-for="item in user.roleList"   :key="item.id"   :label="item.roleName"  :value="item.roleName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  @click="handleSave('user')">保存</el-button>
                    <el-button type="info" @click="backList">返回</el-button>
                </el-form-item>
            </el-form>
        </div>


    </div>
</template>

<script>
import CONSTANT from "@/constant/constant.js";
let common = require("../../common.js");
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            }
            else if (value !== this.user.passwd) {
                callback(new Error('两次输入密码不一致!'));
            }
            else {
                callback();
            }
        };
        var validateMobile = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入手机号码'));
            }
            else if (!(/^1[34578]\d{9}$/.test(value))) {
                callback(new Error('手机号码不合法!'));
            }
            else {
                callback();
            }
        };
        return {
            show:false,
            upLoadUrl: "",
            id:'',
            bannerKey: '',
            imgUrl: '',
            user: {
                userName:'',
                passwd:'',
                confirmPasswd:'',
                loginName:'',
                mobile:'',
                roleName:'',
                roleId:'11',
                roleCode:0,
                roleList:[],
            },
            pageUrlIndex:null,
            rules: {
                // iconImg: [
                //     { required: true, message: '请上传图片', trigger: 'blur' }
                // ],
                userName: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                confirmPasswd: [
                    { required: true, message: '请确认密码', trigger: 'blur' },
                    { min: 6, max:18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                ],
                passwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                userName2: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { validator: validateMobile, trigger: 'blur' }
                ],
                roleName:[
                    { required: true, message: '请选择角色类型', trigger: 'blur' },
                ]
            },
        }
    },
    mounted() {
        this.id = this.$router.currentRoute.query.id;
        this.pageUrlIndex = this.$router.currentRoute.query.pageIndex;
        console.log(this.id);
          this.getUserById();
        if(this.id){
          this.getRoleList();
        }
    },
    methods: {
      // 返回
        backList(){
            this.$router.push('/userAdmin');
        },
        // 获取数据
        getRoleList(){
            let url = CONSTANT.ADMIN.DETAIL+`?id=${this.id}`;
            common.postNoSess(url,null,null,(res)=>{
              console.log(res);
                let data = res.data.bussData;
                let roleList = [];
                this.user.userName = data.userName
                this.user.loginName = data.loginName
                this.user.roleId = data.roleId
                this.imgUrl = data.avatorLink;
                this.bannerKey = data.avatorKey;
            });
        },
         // 获取角色id
        getUserById(){
           let url = CONSTANT.ROLE.LIST;
          //  let param = {userId:this.id} ;
          // let param = JSON.stringify(data);
           common.postNoSess(url,null,null,(res)=>{
                if(res.status == 'success'){
                  console.log(res);
                    let data = res.data.bussData;
                    var newSelectList = data.map(item=>{
                      return{
                        id:item.id,
                        roleName:item.roleName
                      }
                    })
                    console.log(newSelectList);
                    this.user.roleList = newSelectList;
                    this.user.trueName = data.trueName;
                    this.user.userName = data.userName;
                    this.user.mobile = data.mobile;
                    this.user.roleId = data.appRoleId;
                    this.user.roleName = data.roleName;
                }
            })
        },
        getRoleId(e){
            this.user.roleId = e;
            console.log(e);
        },
        handleSave(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let url = null;
                    let param;
                      console.log(this.id); // 编辑
                    if(this.id){
                      url = CONSTANT.ADMIN.UPDATE;
                        param = {
                            userId:this.id,
                            loginName:this.user.loginName,
                            password:this.user.password,
                            userName:this.user.userName,
                            avatorKey:this.bannerKey,
                            id:this.id
                        };
                    }
                    else{
                      url = CONSTANT.ADMIN.INSERT;
                        param = {
                            userName:this.user.userName,
                            loginName:this.user.loginName,
                            avatorKey:this.bannerKey,
                            password:this.user.passwd,
                            roleId:this.user.roleId
                        };
                    }
                    let data = JSON.stringify(param);
                    common.postNoSess(url,data,null,(res)=>{
                      console.log(res);
                        if(res.status == "success") {
                            this.$message({
                                    type: 'success',
                                    message: '保存账户信息成功！'
                                });
                            this.$router.push("/userAdmin");
                            if(!!this.pageUrlIndex){
                                this.$router.push({name:'',params:{'pageIndex':this.pageUrlIndex}});
                            }else{
                                this.$router.push("/userAdmin");
                            }
                        }
                        else{
                            this.$message({
                                type: 'warning',
                                message: res.data.errMsg
                            });
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
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
      }}).success((res) =>{
         this.upLoadUrl = res.data.bussData.uploadUrl;
         let downloadUrl =   res.data.bussData.downloadUrl;
         console.log(res);
        //  将bannerkey保存
         this.bannerKey = res.data.bussData.fileKey;
        common.uploadFile(this.upLoadUrl, file, file.type, res => {
            this.imgUrl = downloadUrl;
            // 图片预览加载成功
            this.loading2 = false;
        });
      }).fail((error) =>{
        console.log(error);
      })
    },
    },

}
</script>
<style scoped>
    .el-input {
        width: 210px !important;
    }
    .el-input__inner{
        width: 210px !important;
    }
    .el-button--primary{
        background-color: #21b5cc !important;
        border: #21b5cc !important;
    }
    .el-button--info {
        color: #000;
        background: #fff !important;
        border: 1px solid #dcdfe6 !important;
    }
</style>

