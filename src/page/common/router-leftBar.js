export default {
  routerList: [
    {
      id:'1',
      menuName: '首页轮播',
      menuUrl: '/swiperManage',
      icon:'el-icon-document',
      childPermissions:[
        {
          id:'1-1',
          menuName: '首页轮播',
          menuUrl: '/',
          menuList:[],
        }
      ],
    },
    {
      id:'2',
      menuName: '依享潮流',
      menuUrl: '/distributionManage',
      icon:'el-icon-document',
      childPermissions:[
        {
          id:'2-1',
          menuName: '依享潮流',
          menuUrl: '/videoList',
          menuList:[],
        },
      ],
    },
    {
      id:'3',
      menuName: '依品管理',
      menuUrl: '/orderManage',
      icon:'el-icon-document',
      childPermissions:[
        {
          id:'3-1',
          menuName: '依品管理',
          menuUrl: '/directionalList',
          menuList:[],
        },
        {
          id:'3-2',
          menuName: '依品分类',
          menuUrl: '/classify',
          menuList:[],
        },
      ],
    },
    {
      id:'4',
      menuName: '艺术伊维斯',
      menuUrl: '/artEneweis',
      icon:'el-icon-document',
      childPermissions:[
        {
          id:'4-1',
          menuName: '艺术伊维斯',
          menuUrl: '/artEneweis',
          menuList:[],
        },
      ],
    },
    {
      id:'5',
      menuName: '艺术插画',
      menuUrl: '/artInset',
      icon:'el-icon-document',
      childPermissions:[
        {
          id:'5-1',
          menuName: '艺术插画',
          menuUrl: '/artInset',
          menuList:[],
        }
      ],
    },
    {
      id:'6',
      menuName: '内衣研究院',
      menuUrl: '/underwearResearch',
      icon:'el-icon-document',
      childPermissions:[
        {
          id:'6-1',
          menuName: '内衣研究院',
          menuUrl: '/underwearResearch',
          menuList:[],
        }
      ],
    },
    {
      id:'7',
      menuName: 'vip中心',
      menuUrl: '/vipCenter',
      icon:'el-icon-document',
      childPermissions:[
        {
          id:'7-1',
          menuName: 'vip中心',
          menuUrl: '/vipCenter',
          menuList:[],
        },
        {
          id:'7-2',
          menuName: '新闻列表',
          menuUrl: '/newsList',
          menuList:[],
        }
      ],
    },
    {
      id:'8',
      menuName: '门店形象',
      menuUrl: '/storeDisplay',
      icon:'el-icon-document',
      childPermissions:[
        {
          id:'8-1',
          menuName: '门店形象',
          menuUrl: '/storeDisplay',
          menuList:[],
        }
      ],
    },
    {
      id:'9',
      menuName: '系统设置',
      menuUrl: '/systemSet',
      icon:'el-icon-document',
      childPermissions:[
        {
          id:'9-1',
          menuName: '系统设置',
          menuUrl: '/systemSet',
          menuList:[],
        }
      ],
    },
    {
      id:'11',
      menuName: '管理员设置',
      menuUrl: '/adminSet',
      icon:'el-icon-document',
      childPermissions:[
        {
          id:'11-1',
          menuName: '角色管理',
          menuUrl: '/roleAdmin',
          menuList:[],
        },
        {
          id:'11-1',
          menuName: '用户管理',
          menuUrl: '/userAdmin',
          menuList:[],
        }
      ],
    }
  ]
}
