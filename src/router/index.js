import Vue from 'vue';
import Router from 'vue-router';
const loginPage = resolve => require(['@/page/common/login-page'], resolve)
const rechargePassword = resolve => require(['@/page/common/recharge-password'], resolve)
//首页轮播
const swiperList = resolve => require(['@/page/swiperManage/swiperList'], resolve)
const swiperDetail = resolve => require(['@/page/swiperManage/swiperDetail'], resolve)
const swiperAdd = resolve => require(['@/page/swiperManage/swiperAdd'], resolve)
//伊品管理
const directionalList = resolve => require(['@/page/orderManage/directionalList'], resolve)
const directionalDetail = resolve => require(['@/page/orderManage/directionalDetail'], resolve)
// 依品分类
const classify = resolve => require(['@/page/orderManage/classify'], resolve)
const classifyModify = resolve => require(['@/page/orderManage/classifyModify'], resolve)
//依享潮流
const videoList = resolve => require(['@/page/distributionManage/videoList'], resolve)
const videoRedact = resolve => require(['@/page/distributionManage/videoRedact'], resolve)
const videoView = resolve => require(['@/page/distributionManage/videoView'], resolve)
// 艺术伊维斯
const artEneweis = resolve => require(['@/page/artEneweis/artEneweis'], resolve)
// 艺术插画
const artInset = resolve => require(['@/page/artInset/artInset'], resolve)
// 内衣研究院
const underwearResearch = resolve => require(['@/page/underwearResearch/underwearResearch'], resolve)
// vip中心
const vipCenter = resolve => require(['@/page/vipCenter/vipCenter'], resolve)
const newsList = resolve => require(['@/page/vipCenter/newsList'], resolve)
const newsListEdit = resolve => require(['@/page/vipCenter/newsListEdit'], resolve)
// 门店形象
const storeDisplay = resolve => require(['@/page/storeDisplay/storeDisplay'], resolve)
const addNewsStore = resolve => require(['@/page/storeDisplay/addNewsStore'], resolve)
const storeEdit = resolve => require(['@/page/storeDisplay/storeEdit'], resolve)
// 系统设置
const systemSet = resolve => require(['@/page/systemSet/systemSet'], resolve)
// 管理员设置
const roleAdmin = resolve => require(['@/page/adminSet/roleAdmin'], resolve)
const userAdmin = resolve => require(['@/page/adminSet/userAdmin'], resolve)
const roleEdit = resolve => require(['@/page/adminSet/roleEdit'], resolve)
const userEdit = resolve => require(['@/page/adminSet/userEdit'], resolve)


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/sys/',
  routes: [
    {
      path: '/loginPage',
      name: 'loginPage',
      component: loginPage
    },
    {
      path: '/rechargePassword',
      name: 'rechargePassword',
      component: rechargePassword
    },
    {
      path: '/classify',
      name: 'classify',
      component: classify
    },
    {
      path: '/classifyModify',
      name: 'classifyModify',
      component: classifyModify
    },
    {
      path: '/',
      name: 'swiperList',
      component: swiperList
    },
    {
      path: '/swiperDetail',
      name: 'swiperDetail',
      component: swiperDetail
    },
    {
      path: '/swiperAdd',
      name: 'swiperAdd',
      component: swiperAdd
    },
    {
      path: '/directionalList',
      name: 'directionalList',
      component: directionalList
    },
    {
      path: '/directionalDetail',
      name: '/directionalDetail',
      component: directionalDetail
    },
    {
      path: '/videoList',
      name: '/videoList',
      component: videoList
    },
    {
      path: '/videoRedact',
      name: '/videoRedact',
      component: videoRedact
    },
    {
      path: '/videoView',
      name: '/videoView',
      component: videoView
    },
    {
      path: '/artEneweis',
      name: '/artEneweis',
      component: artEneweis
    },
    {
      path: '/artInset',
      name: '/artInset',
      component: artInset
    },
    {
      path: '/underwearResearch',
      name: '/underwearResearch',
      component: underwearResearch
    },
    {
      path: '/vipCenter',
      name: '/vipCenter',
      component: vipCenter
    },
    {
      path: '/newsList',
      name: '/newsList',
      component: newsList
    },
    {
      path: '/newsListEdit',
      name: '/newsListEdit',
      component: newsListEdit
    },
    {
      path: '/storeDisplay',
      name: '/storeDisplay',
      component: storeDisplay
    },
    {
      path: '/addNewsStore',
      name: '/addNewsStore',
      component: addNewsStore
    },
    {
      path: '/storeEdit',
      name: '/storeEdit',
      component: storeEdit
    },
    {
      path: '/systemSet',
      name: '/systemSet',
      component: systemSet
    },
    {
      path: '/roleAdmin',
      name: '/roleAdmin',
      component: roleAdmin
    },
    {
      path: '/userAdmin',
      name: '/userAdmin',
      component: userAdmin
    },
    {
      path: '/roleEdit',
      name: '/roleEdit',
      component: roleEdit
    },
    {
      path: '/userEdit',
      name: '/userEdit',
      component: userEdit
    },
  ]
})
