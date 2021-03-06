// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import $ from 'jquery'
import axios from 'axios'
import common from './common'
import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap/js/modal.js'
import 'bootstrap/js/dropdown.js'
import 'bootstrap/js/tooltip.js'
import 'font-awesome/css/font-awesome.css'
import 'summernote'
import 'summernote/dist/lang/summernote-zh-CN.js'
import 'summernote/dist/summernote.css'
//import distpicker from 'distpicker'
import VDistpicker from 'v-distpicker'

import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
Vue.component('v-distpicker', VDistpicker)

Vue.use(VueResource);
Vue.use(ElementUI);

Vue.prototype.$ajax = axios;

Vue.http.interceptors.push(function(request, next) {//拦截器
  request.credentials = false;
  next((res)=>{
    //401 登陆过期跳转
    // console.log(res);
    if(res.body.status == 401 || !sessionStorage.getItem('sessionId')){
        router.push("/loginPage");
    }
  })
})

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
