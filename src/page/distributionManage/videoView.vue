<template>
  <div id="upDate">
    <header>
      <p class="pageSwiper">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/videoList' }">视频管理</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">查看</a></el-breadcrumb-item>
        </el-breadcrumb>
      </p>
    </header>
    <div class="swiper-img">
      <span>视频名称</span>
      <el-input class="put" v-model="input" placeholder="黑客帝国删减版part2"></el-input>
    </div>
    <div class="show">
      <span>是否展示</span>
        {{fileList.enable ? '是' : '否'}}
    </div>
    <div class="videoShow show">
      <span>视频预览</span>
      <div class="viewWindos">
        <video controls="true" :src="fileList.videoLink" :poster="fileList.imageLink"></video>
      </div>
    </div>
  </div>
</template>

<script>
import CONSTANT from "../../constant/constant.js";
let common = require("../../common.js");
  export default {
    data() {
      return {
        fileList: {},
        input: '',
        id:'',
      };
    },
    mounted(){
      this.id  = this.$router.currentRoute.query.id;
      console.log(this.id);
      this.getDetail()
    },
    methods:{
      getDetail(){
        let url = `${CONSTANT.PRODUCTMANAGE.DETAIL}?id=${this.id}`;
        common.postNoSess(url, null, null, res => {
          if(res.status === "success"){
            this.fileList = res.data.bussData;
            console.log(res.data.bussData);
            this.input = res.data.bussData.name
          }
        });
      }
    }
  }
</script>

<style scope>
#upDate{
  width:100%;
  height:100%;
  background: #fff;
  color: rgba(16, 16, 16, 1);
  font-size: 16px;
  font-family: Microsoft Yahei;
}
.viewWindos{
  margin-left:90px;
  width: 328px;
  height: 180px;
  line-height: 41px;
  color: rgba(16, 16, 16, 1);
  font-size: 28px;
  text-align: center;
  font-family: Roboto;
  border: 1px solid rgba(187, 187, 187, 1);
  margin-bottom: 200px;
}
.viewWindos>video{
  height: 180px;
}
.upVideo{
  overflow: hidden;
  float: left;
}
  .pageSwiper{
    padding-top:20px;
    padding-left:20px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    text-align: left;
    font-family: PingFangSC-regular;
  }
  .swiper-img{
    height:80px;
    padding-left:164px;
    margin-top:10px;
  }
  .swiper-img>span{
    display: block;
    float: left;
    padding-right:30px;
    line-height:80px;

  }
  .put{
    float: left;
    width:180px;
    margin-top:18px;
  }

  .show{
    margin-top:20px;
    padding-left:164px;
  }
  .show>span{
    margin-right:20px;
    float: left;
  }
  .but{
    display: block;
    margin:40px auto;
  }
  .qued{
    padding-bottom:60px;
  }
</style>
