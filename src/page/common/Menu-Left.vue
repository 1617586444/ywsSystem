 <template>
    <el-col :style="{height:heightLength+'px'}" class="el-left-menu" :span="3">
        <el-menu  background-color="#324157" text-color="#bfcbd9" :default-active="active" :active="active"  class="el-menu-vertical-demo"  router unique-opened>
            <el-submenu v-for="menuItem in routeList" :key="menuItem.id" :index="menuItem.menuUrl">
                <template slot="title">
                    <!-- <i :class="menuItem.icon"></i> -->
                    <span>{{menuItem.menuName}}</span>
                </template>
                <el-menu-item  v-for="item in menuItem.subMenus"  :key="item.menuName"  :index="item.menuUrl" >{{item.menuName}} </el-menu-item>
                <!-- <el-submenu v-for="item in menuItem.childPermissions" :key="item.id" :index="item.menuUrl"  v-if='item.length != 0 '>
                    <template slot="title">
                        <i></i>
                        <span>{{item.menuName}}</span>
                    </template>
                    <el-menu-item  v-for="list in item.childPermissions"  :key="list.menuName"  :index="list.menuUrl">  {{list.menuName}} </el-menu-item>
                </el-submenu> -->
            </el-submenu>
        </el-menu>
    </el-col>
</template>

<script>
import CONSTANT from "../../constant/constant.js";
let  common = require('../../common.js');
var routerList = require('./router-leftBar.js');
export default {
  data () {
    return {
        active:'',
        routeList:[],
        // routeList:routerList.default.routerList,
        heightLength:''
    }
  },
  created(){
      this.heightLength = document.body.scrollHeight ;
  },
  mounted(){
        this.leftPermission();
        // this.fresh(1);
        window.addEventListener('scroll', ()=>{
            let scrollHeight = document.body.scrollHeight;
            this.heightLength = scrollHeight-80
        })
        let active = '/'+ this.$router.currentRoute.path.split('/')[1];
        this.active = active;
  },
  methods:{
    leftPermission(){
        let url = CONSTANT.ADMIN.DETAIL;
        let data = {};
        let param = JSON.stringify(data);
        common.post(url,param,null,(res)=>{
            sessionStorage.setItem('avatorLink',res.data.bussData.avatorLink);
            this.routeList = res.data.bussData.menus;
            let active = '/'+ this.$router.currentRoute.path.split('/')[1];
            this.active = active;
        })
    },
    fresh(x){
        if(x == 1){
            setTimeout(()=> { window.location.reload();}, 1000);
        }
        else{
            this.fresh(x-1);
        }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scope>
    .el-left-menu{
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .el-left-menu::-webkit-scrollbar {
        display: none;
    }
    .el-left-menu .el-col .el-col-3{
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .el-left-menu{
      height:1000px;
      position: fixed;
      left: 0;
      width: 206px;
    }
    .el-menu-vertical-demo{
      height: 900px;
    }

    .el-menu-item{
        min-width:auto!important;
    }
    .el-menu-item-group__title{
        padding-top: 0px!important;
    }
    .el-menu-item{
        a{
            display: block;
            color: red;
        }
        &.is-active{
            a{
              color: red;
            }
        }
    }
</style>
