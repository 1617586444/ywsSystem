<template>
  <div
  v-loading="loading2"
  element-loading-text="拼命上传中..."
  element-loading-spinner="el-icon-loading"
  >
    <el-form :model="information" :rules="rules" ref="information" >
    <p class="pageSwiper">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/storeDisplay' }">门店形象</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">添加新门店</a></el-breadcrumb-item>
      </el-breadcrumb>
    </p>
    <div class="addressInfo">
      <el-form-item prop="content">
      <div class="province" >
        <span>省份</span>
        <el-select size="small" style="width: 100px"
        v-model="selectProv"
        placeholder="请选择省份"
        v-on:change="getProv($event)">
        <el-option v-for="(item,i) in provs"
            :label="item.label"
            :key="i"
            :value="item.value">
        </el-option>
      </el-select>
      </div>
      </el-form-item>
      <div class="city">
        <span>城市</span>
        <el-select size="small" style="width: 100px"
            v-if="selectProv!=''"
            v-model="selectCity"
            placeholder="请选择城市"
            v-on:change="getCity($event)">
          <el-option
            v-for="(item,j) in citys"
            :key="j"
            :label="item.label"
            :value="item.value">
          </el-option>
      </el-select>
      </div>
      <el-form-item >
      <div class="definiteAddress">
        <span>具体地址</span>
        <el-input v-model="address" class="but" size="mini" placeholder="单行输入"></el-input>
      </div>
      </el-form-item>
      <div class="storeName">
        <span>店名</span>
        <el-input v-model="shopName" class="but" size="mini" placeholder="单行输入"></el-input>
      </div>
      <div class="definiteAddress">
        <span>联系电话</span>
        <el-input v-model="phone" class="but" size="mini" placeholder="单行输入"></el-input>
      </div>
    </div>
    <div class="confirm">
      <el-button type="primary"
      @click="submitForm"
      >确定</el-button>
    </div>
    </el-form>
  </div>
</template>

<script>
import CONSTANT from "../../constant/constant.js";
let common = require("../../common.js");
import PROVIN from '../../constant/city.js';
import PROVIN2 from '../../constant/city2.js';
export default {
  data() {
    return{
        provs:PROVIN,
        citys: [],
        selectProv: '',
        selectCity: '',
        input: '',
        address: '',
        city: '',
        phone: '',
        province: '',
        shopName: '',
        loading2: '',
        information: {
          content:'',
        },
        rules: {
        content:[
          { required: true, message: '请输入内容', trigger: 'blur' },
        ],
        province:[
              { required: true, message: '请上传图片', trigger: 'blur' },
          ],
        },
    }
  },
  created(){
    },
  methods:{
     /*二级联动选择地区*/
    getProv: function (prov) {
      let tempCity=[];             
      this.citys=[];
      this.selectCity=''; 
      let allCity = PROVIN2;
    for (var val of allCity){
         if (prov == val.prov){
          this.province = val.prov;
            tempCity.push({label: val.label, value: val.label})
       }
      }
      this.citys = tempCity;
    },
    getCity(city) {
//       console.log(this.selectCity)
      this.city = this.selectCity;
     }, 
    // 确定提交
    submitForm(){
      this.loading2 = true;
    // console.log(this.shopName);
    // console.log(this.city);
    let url = CONSTANT.SHOP.INSERT;
    console.log(url);
    let data = {
        address:this.address,
        city:this.city,
        phone:this.phone,
        province:this.province,
        shopName:this.shopName,
    }
    let param = JSON.stringify(data);
    common.postNoSess(url, param, null,res => {
      console.log('成功',res);
        if(res.status == 'success') {
            this.$message({
                type: 'success',
                message: '保存成功!'
            });
            setTimeout(() =>{
              this.$router.push('/storeDisplay')
            },1500)
            this.loading2 = false;
            this.getContent();
        } else {
            this.$message({
                type: 'error',
                message: res.data.errMsg
            });
            this.loading2 = false;
          }
      });
    },
  },
}
</script>

<style scope>
  .addressInfo{
    padding:100px 0 0 250px;
  }
  .province{
    padding-bottom:38px;
  }
  .province>span{
    padding-right:68px;
  }
  .city>span{
    padding-right:68px;
  }
  .definiteAddress>sapn{
    padding-right:40px;
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
    font-family: SourceHanSansSC-regular;
  }
  .but{
    width: 200px;
    padding-top:40px;
    margin-left:40px;
  }
  .storeName>span{
     padding-right:40px;
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
    font-family: SourceHanSansSC-regular;
  }
  .confirm{
  margin-top:40px;
    text-align: center;
  }
</style>
