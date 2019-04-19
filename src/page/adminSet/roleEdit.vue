<template>
    <div class="contain-edit">
        <div class="header">
           <p>新增/修改角色</p>
       </div>
       <div class="main">
            <el-form :model="role" :rules="rules" ref="role" label-width="120px" class="">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="role.roleName" placeholder="请输入角色名称"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleDescribe">
                    <el-input type="textarea" v-model="role.roleDescribe" placeholder="请输入角色描述" :rows="5" style="width:400px;"></el-input>
                </el-form-item>
                <el-form-item label="角色权限" prop="checkedOrder">
                   <div class="access-list">
                      <!-- <div  v-for="(item,index) in role.roleList" :key="item.id" class="access-item">
                        <template>
                          <el-checkbox v-model="item.checkAll" :indeterminate="item.isIndeterminate" @change="roleChange(index)"  :label="item.id" :key="item.id">{{item.menuName}}</el-checkbox>
                          <el-checkbox-group v-model="role.checkedOrder" style="margin-left: 20px;">
                            <el-checkbox v-for="(list,num) in item.subMenus" @change="roleListChange(index,num)" :label="list.id" :key="list.id">{{list.menuName}}
                            <el-checkbox v-for="(point,i) in list.subMenus" @change="pointListChange(index,num,i)" :label="point.id" :key="point.id">{{point.menuName}}</el-checkbox>
                            </el-checkbox>

                          </el-checkbox-group>

                        </template>
                      </div> -->
                      <el-tree
                      :data="roleDescribeLis"
                      show-checkbox
                      node-key="id"
                      ref="tree"
                      :default-checked-keys="checkedList"
                      @check-change="fd"
                      :props="defaultProps">
                      </el-tree>
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
import CONSTANT from '@/constant/constant.js';
let common = require("@/common.js");
export default {
    data() {
      return {
          id:'',
          idList:[],
          checkedList:[],
          role: {
              roleList:[],
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
        defaultProps: {
          children: 'subMenus',
          label: 'menuName'
        },
        roleDescribeLis:[],
      }
    },
    mounted() {
        this.id = this.$router.currentRoute.query.id;
        if(this.id){
            this.getDetailById();
            this.getList();
        }else{
            this.getList();
        }
    },
    methods: {
        backList:function(){
            this.$router.go(-1);
        },
        getDetailById(){
          console.log('进来了');
            let url = CONSTANT.ROLE.DETAIL+`?id=${this.id}`;
            common.postNoSess(url,null,null,(res)=>{
              if(res.status == 'success'){
                let data = res.data.bussData;
                    this.role.roleName = data.roleName;
                    this.role.roleDescribe = data.roleDesc;
                    let array = [];
                    data.menuIds.forEach((e)=> {
                      e = parseInt(e);
                        array.push(e);
                    });
                    this.checkedList = array;
                      console.log(  this.checkedList);
                    this.getList();
                }
            })
        },
        fd(){
            this.role.checkedOrder=this.$refs.tree.getCheckedKeys()
            console.log(this.$refs.tree.getCheckedKeys());
            console.log(this.role.checkedOrder);
        },
        getList(){
            let url = CONSTANT.AUTHOR.GETLIST;
            let data = {};
            let param = JSON.stringify(data);
            common.postNoSess(url,param,null,(res)=>{
                let data = res.data.bussData;
                console.log(data,'数据');
                data.forEach((item)=>{
                    let status = false,
                        num = 0;
                    item.subMenus.map((list)=>{
                        if(this.role.checkedOrder.includes(list.id)){
                            status = true;
                            num++
                        }
                    })
                    item.checkAll = num === item.subMenus.length?true:false;
                    item.isIndeterminate = num === item.subMenus.length?false:status;
                })
                this.role.roleList = data;
                this.roleDescribeLis = data;
            })
        },
        handleSave(formName){
            this.$refs[formName].validate((valid) => {
              // valid = true
                if (valid) {
                    let url = null,
                    data,param;
                    if(this.id){
                      //  this.role.checkedOrder = [];
                      console.log(this.role.checkedOrder);
                        url = CONSTANT.ROLE.UPDATE
                        this.role.checkedOrder.forEach((item)=>{
                            item = parseInt(item)
                        })
                        param = {
                            roleName:this.role.roleName,
                            roleDesc:this.role.roleDescribe,
                            menuIds:this.role.checkedOrder,
                            id:this.id
                        }
                    }else{

                        url = CONSTANT.ROLE.INSERT;
                        param = {
                            roleName:this.role.roleName,
                            roleDesc:this.role.roleDescribe,
                            menuIds:this.role.checkedOrder
                        }
                    }
                    data = JSON.stringify(param);
                    common.postNoSess(url,data,null,(res)=>{
                        if(res.status == 'success'){
                            this.$message({
                                type: 'success',
                                message: '保存成功！'
                            });
                            setTimeout(()=>{
                                // this.$router.go(-1);
                                this.$router.push({ path: '/roleAdmin', query: { edit:'edit' } })
                            },500)
                        }else{
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
        roleChange(index){
            let arr = this.role.roleList[index].menuIds,
                id = this.role.roleList[index].id;
                this.idList.push(this.role.roleList[index].id);
                console.log('第一层id',this.id);
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
        roleListChange(index,num){
            let objArr = this.role.roleList[index].subMenus,
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
                    console.log('第二层id',this.role.roleList[index].id);
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
            let objArr = this.role.roleList[index].subMenus,
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
                    id = (objArr[num].subMenus)[i].id;
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

