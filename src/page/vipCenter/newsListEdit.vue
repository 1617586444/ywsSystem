<template>
  <div class="storeAdmin">
    <div class="productName">
      <span class="sp1">商品名称：</span>
      <el-input class="put" v-model="input" placeholder="请输入"></el-input>
    </div>
    <div class="productImg">
      <span class="sp2">配图</span>
      <img src="https://wx1.sinaimg.cn/mw690/006dmw5Ngy1fmwqlcmgtkj30j60j6dhn.jpg" alt="">
    </div>
    <div class="productBigImg">
      <span class="sp3">图文详情</span>
      <img src="https://wx1.sinaimg.cn/mw690/006dmw5Ngy1fmwqlcmgtkj30j60j6dhn.jpg" alt="">
    </div>
    <div class="productSelet">
      <span class="sp4">商品所属分类</span>
      <el-select v-model="value" placeholder="家居">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
     </el-select>
    </div>
    <div class="buttons">
      <el-button class="but" size="mini" type="primary">保存</el-button>
      <el-button
      size="mini"
      type="primary"
      >
      提交
      </el-button>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      input: '',
      options: [
          {
          value: '家居',
          label: '家居'
        },
        {
          value: '家居',
          label: '家居'
        },
        {
          value: '裤子',
          label: '裤子'
        }
        ],
         value: ''
    }
  }
}
</script>

<style scoped>
  .storeAdmin{
    height:100%;
    width:100%;
    background: #fff;
    padding-left:50px;
  }
  .productName{
    width:100%;
  }
  .sp1{
    float: left;
    background: #fff;
    margin-top:28px;
    margin-right:70px;
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
    font-family: SourceHanSansSC-regular;
  }
  .put{
  float: left;
  width:180px;
  margin-top:18px;
  }
  .productImg{
    float: left;
    height:120px;
    width: 100%;
    padding-top:44px;
  }
  .sp2{
    margin-right:100px;
    margin-bottom:30px;
  }
  .productImg>img{
    width: 200px;
    height: 120px;
  }
  .productBigImg{
    float: left;
    padding-top: 40px;
  }
  .productBigImg>img{
    width: 300px;
    height: 200px;
    margin-left:66px;
  }
  .productSelet{
    float: left;
    padding-top:50px;
    width:100%;
  }
  .sp4{
    padding-right:60px;
  }
  .buttons{
    float: left;
    padding-top: 50px;
    padding-left:200px;
  }
</style>

