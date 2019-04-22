<template>
  <div>
    <p class="pageSwiper">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/storeDisplay' }">门店形象</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">编辑新门店</a></el-breadcrumb-item>
      </el-breadcrumb>
    </p>
    <el-form :model="information" :rules="rules" ref="information" >
    <div class="addressInfo">
      <el-form-item>
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
       <div class="city">
        <span>城市</span>
        <el-select size="small" style="width: 100px"
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
      </el-form-item>
     <el-form-item >
      <div class="definiteAddress">
        <span>具体地址</span>
        <el-input v-model="address" class="but" size="mini" placeholder="单行输入"></el-input>
      </div>
      </el-form-item>
     <el-form-item >
      <div class="definiteAddress">
        <span>联系电话</span>
        <el-input v-model="phone" class="but" size="mini" placeholder="单行输入"></el-input>
      </div>
      </el-form-item>
    </div>
    <div class="confirm">
      <el-button type="primary" @click="submit('information')">确定</el-button>
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
        province: '',
        id: '',
        phone: '',
        city: '',
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
  mounted(){
    this.id = this.$router.currentRoute.query.id;
    if (this.id) {
      this.getList();
      console.log(this.selectProv);
    }
  },
  methods:{
    //获取信息列表数据
    getList() {
      let url = CONSTANT.SHOP.DETAIL + `?id=${this.id}`;
      common.postNoSess(url, null, null, res => {
        let data = res.data;
        console.log(data);
        this.address = data.bussData.address;
        this.selectCity = data.bussData.city;
        this.city = data.bussData.city;
        this.province = data.bussData.province;
        this.selectProv = data.bussData.province;
        this.phone = data.bussData.phone;
        this.shopName = data.bussData.shopName;
        for(var peov of PROVIN){
          // console.log(peov.value);
          if(peov.value ==  this.selectProv){
            console.log(peov.value);
              for (var val of PROVIN2){
              if (peov.value == val.prov){
              // 省份接口
              this.province = val.prov;
              this.citys.push({label: val.label, value: val.label})
              }
            }
          }
        }
      });
        // console.log(PROVIN);
    },
    // 确定保存
    submit(formName) {
      this.$refs[formName].validate(valid => {
        console.log(this.input);
        if (valid) {
          this.loading = true;
          let url = "";
          if (this.id) {
            url = CONSTANT.SHOP.UPDATE;
          } else {
            url = CONSTANT.SHOP.INSERT;
          }
          let data = {
            address: this.address,
            city: this.city,
            id: this.id,
            phone: this.phone,
            province: this.province,
            shopName: this.shopName,
          };
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
                this.$router.push("/storeDisplay");
              }, 1000);
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
     /*二级联动选择地区*/
    //  选择省份触发
    getProv (prov) {
      this.citys=[];
      this.selectCity=''; 
      for (var val of PROVIN2){
        if (prov == val.prov){
         // 省份接口
        this.province = val.prov;
        this.citys.push({label: val.label, value: val.label})
        }
      }
        console.log(this.citys);
   },
    // 选择城市触发
    getCity(city) {
      console.log(this.selectCity)
      this.city = this.selectCity;
     }, 
  },
}
</script>

<style scoped>
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
  .confirm{
  margin-top:40px;
    text-align: center;
  }
</style>
