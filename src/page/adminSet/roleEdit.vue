<template>
    <div class="contain-edit">
        <div class="header">
           <p>新增/修改角色</p>
           <el-button type="primary" @click="backList()">返回</el-button>
       </div>
       <div class="main">
        <el-form :model="role" :rules="rules" ref="role" label-width="120px" class="">
        <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="role.roleName" placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDescribe">
            <el-input v-model="role.roleDescribe" placeholder="单行输入" :rows="2" style="width:250px;"></el-input>
        </el-form-item>
          <el-form-item label="角色权限" prop="roleList">
            <div class="access-list">
            <div  v-for="(item,index) in role.roleList" :key="item.id" class="access-item">
              <template>
                <!-- <el-checkbox v-model="item.checkAll" :indeterminate="item.isIndeterminate" @change="roleChange(index)"  :label="item.id" :key="item.id">{{item.permissionName}}</el-checkbox> -->
                {{item.permissionName}}
                <el-checkbox-group v-model="role.checkedOrder" style="margin-left: 20px;">
                <el-checkbox v-for="(list,num) in item.childPermissions" @change="roleListChange(index,num)" :label="list.id" :key="list.id">{{list.menuName}}
                    <el-checkbox v-for="(point,i) in list.childPermissions" @change="pointListChange(index,num,i)" :label="point.id" :key="point.id">{{point.menuName}}</el-checkbox>
                </el-checkbox>
                </el-checkbox-group>
              </template>
            </div>
            </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="handleSave('role')">保存</el-button>
          <el-button type="info" @click="backList">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    </div>
</template>

<script>
import CONSTANT from "../../constant/constant.js";
let common = require("../../common.js");
import FileSaver from 'file-saver'
export default {
    data() {
        return {
            id:'',
            role: {
                roleList:[
                  { id:0,
                    permissionName:'首页轮播',
                    childPermissions:[
                      {
                        menuName: "首页轮播"
                      }
                    ]
                  },
                  {
                    id:1,
                    permissionName:'依享潮流',
                    childPermissions:[
                      {
                        menuName: "依享潮流"
                      }
                    ]
                  },
                  {
                    id:2,
                    permissionName:'依品管理',
                    childPermissions:[
                      {
                        menuName: "依品管理"
                      },
                      {
                        menuName: "依品分类"
                      },
                    ]
                  },
                  {
                    id:3,
                    permissionName:'艺术伊维斯',
                    childPermissions:[
                      {
                        menuName: "艺术伊维斯"
                      },
                    ]
                  },
                  {
                    id:4,
                    permissionName:'艺术插画',
                    childPermissions:[
                      {
                        menuName: "艺术插画"
                      },
                    ]
                  },
                  {
                    id:5,
                    permissionName:'内衣研究院',
                    childPermissions:[
                      {
                        menuName: "内衣研究院"
                      },
                    ]
                  },
                  {
                    id:6,
                    permissionName:'VIP中心',
                    childPermissions:[
                      {
                        menuName: "VIP中心"
                      },
                    ]
                  },
                  {
                    id:7,
                    permissionName:'门店形象',
                    childPermissions:[
                      {
                        menuName: "门店形象"
                      },
                    ]
                  },
                  {
                    id:8,
                    permissionName:'管理员设置',
                    childPermissions:[
                      {
                        menuName: "角色管理"
                      },
                      {
                        menuName: "用户管理"
                      },
                    ]
                  },
                ],
                roleName:'',
                roleDescribe:'',
                checkedOrder:[],
            },
            rules: {
                roleName: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                ],
                roleDescribe: [
                    { required: true, message: '请输入角色描述', trigger: 'blur' },
                    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ],
                roleList:[
                    { type: 'array', required: true, trigger: 'change' }
                ],
                checkedOrder:[
                    { type: 'array',  message: '请选择角色权限', required: true, trigger: 'change' }
                ]
            },
            roleDesc:'',
            roleMenuIds:[0],
            roleName:'',

        }
    },
    mounted() {
        this.id = this.$router.currentRoute.query.id;
        if(this.id){
            // this.getDetailById();
        }else{
            // this.getList();
        }
    },
    methods: {
        backList:function(){
            this.$router.go(-1);
        },
        getDetailByI(){
            let url = CONSTANT.ROLE.INSERT;
            let param = { roleId:this.id} ;
            common.requestAjax(url,param,null,(res)=>{
                if(res.status == 200){
                    let data = res.data.bussData;
                    this.role.roleName = data.roleName;
                    this.role.roleDescribe = data.roleDescribe;
                    let array = [];
                    data.permissionIds.forEach(function(e) {
                        e = parseInt(e);
                        array.push(e);
                    }, this);
                    this.role.checkedOrder = array;
                    // this.getList();
                }
            })
        },
        getList:function(){
            let url = CONSTANT.SYSTEM.GETALLAPPPERMISSION;
            let data = {};
            let param = JSON.stringify(data);
            common.requestAjax(url,param,null,(res)=>{
                let data = res.data.bussData;
                data.forEach((item)=>{
                    let status = false,
                        num = 0;
                    item.childPermissions.map((list)=>{
                        if(this.role.checkedOrder.includes(list.id)){
                            status = true;
                            num++
                        }
                    })
                    item.checkAll = num === item.childPermissions.length?true:false;
                    item.isIndeterminate = num === item.childPermissions.length?false:status;
                })
                this.role.roleList = data;
            })
        },
        handleSave(formName){
          this.$refs[formName].validate((valid) => {
          // if (valid) {
              let url = CONSTANT.ROLE.INSERT,
              data;
              // if(this.role.checkedOrder.length){
              //     this.role.checkedOrder.forEach((item)=>{
              //         item = parseInt(item)
              //     })
              // }else{
              //     this.role.checkedOrder = []
              // }
              data = {
                  roleName:this.role.roleName,
                  roleDesc:this.role.roleDescribe,
                  roleMenuIds:this.roleMenuIds,
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
                    this.$router.push("/roleAdmin");
                  }, 2000);
                } else {
                  this.$message({
                    type: "error",
                    message: res.data.errMsg
                  });
                  this.loading = false;
                }
              });
          // } else {
          //     console.log('error submit!!');
          //     return false;
          // }
          });
        },
        roleChange:function(index){
            let arr = this.role.roleList[index].childPermissions,
                id = this.role.roleList[index].id;
                this.role.roleList[index].isIndeterminate = false;
                arr.map((item)=>{
                    if(event.target.checked){
                        if(!this.role.checkedOrder.includes(item.id)){
                            this.role.checkedOrder.push(item.id)
                        }
                        if(this.role.checkedOrder.includes(id)) return;
                        this.role.checkedOrder.push(id)
                    }else{
                        this.role.checkedOrder.map((list,index)=>{
                            if( list == item.id){
                                this.role.checkedOrder.splice(index,1)
                            }
                        })
                        this.role.checkedOrder.map((list,index)=>{
                            if( list ==id){
                                this.role.checkedOrder.splice(index,1)
                            }
                        })
                    }
                })
        },
        roleListChange:function(index,num){
            let objArr = this.role.roleList[index].childPermissions,
                 obj = objArr[num];
                 console.log('第二层',this.role.roleList[index],obj,objArr);
                this.role.checkedOrder.find((item,index)=>{
                    if(event.target.checked){
                        if(this.role.checkedOrder.includes(obj.id)) return;
                        this.role.checkedOrder.push(obj.id)
                    }else{
                        if(!this.role.checkedOrder.includes(obj.id)) return;
                         this.role.checkedOrder.splice(index,1)
                    }
                })
                let checkNum = 0,
                    id = this.role.roleList[index].id;
                    console.log('ababa',id);
                objArr.map((item)=>{
                    if(this.role.checkedOrder.includes(item.id)){
                        checkNum++
                    }
                })

                if(checkNum>0&&checkNum<objArr.length){
                    this.role.roleList[index].isIndeterminate = true
                }else if(checkNum==0||checkNum == objArr.length){
                    this.role.roleList[index].isIndeterminate = false
                }

                if(checkNum == 0){
                    this.role.roleList[index].checkAll = false
                }else if(checkNum == objArr.length){
                    this.role.roleList[index].checkAll = true
                }

                if(checkNum){
                    if(this.role.checkedOrder.includes(id)) return;
                    this.role.checkedOrder.push(id)
                }else{
                    this.role.checkedOrder.find((item,index)=>{
                        if(item == id){
                            this.role.checkedOrder.splice(index,1)
                        }
                    })
                }
        },
        pointListChange(index,num,i){
            let objArr = this.role.roleList[index].childPermissions,
            obj = objArr[num];
            this.role.checkedOrder.find((item,index)=>{
                    if(event.target.checked){
                        if(this.role.checkedOrder.includes(obj.id)) return;
                        this.role.checkedOrder.push(obj.id)
                    }else{
                        if(!this.role.checkedOrder.includes(obj.id)) return;
                         this.role.checkedOrder.splice(index,1)
                    }
                })
                let checkNum = 0,
                    id = (objArr[num].childPermissions)[i].id;
                objArr.map((item)=>{
                    if(this.role.checkedOrder.includes(item.id)){
                        checkNum++
                    }
                    console.log('objArr.map',this.role.checkedOrder,id,checkNum,objArr.length);
                })

                if(checkNum>0&&checkNum<objArr.length){
                    this.role.roleList[index].isIndeterminate = true
                }else if(checkNum==0||checkNum == objArr.length){
                    this.role.roleList[index].isIndeterminate = false
                }

                if(checkNum == 0){
                    this.role.roleList[index].checkAll = false
                }else if(checkNum == objArr.length){
                    this.role.roleList[index].checkAll = true
                }
                console.log('第三层',objArr,obj,this.role.checkedOrder);
                if(checkNum){
                    if(this.role.checkedOrder.includes(id)) return;
                    this.role.checkedOrder.push(id)
                }else{
                    this.role.checkedOrder.find((item,index)=>{
                        if(item == id){
                            this.role.checkedOrder.splice(index,1)
                        }
                    })
                }

        },
    },

}
</script>
<style lang="scss" scoped>
    .el-button--info {
        color: #000;
        background: #fff !important;
        border: 1px solid #dcdfe6 !important;
    }
</style>

