
// const domain = 'http://192.168.1.102:60813/';
const domain = 'http://47.92.193.97/api/';
// const domain = 'https://39.108.209.50/';
const api = domain + 'admin/';
// const domain = window.location.host+'/api/',
// api = `https://${domain}admin/`;
var CONSTANT = {
  //管理员
  ADMIN: {
    LOGIN: api + 'manager/login',      //登录接口
    LOGINOUT: api + 'manager/logout',    // 登出接口
    UPDUSERPWD: api + 'manager/reset_passowrd', //重置密码接口
    FINDUSERPERMISSIONS: api + 'user/findUserPermissions', //获取用户拥有的左侧菜单权限
  },
  //轮播图管理
  SWIPERMANAGE: {
    FINDDETAIL: api + 'banner/insert', // 确定提交
    FINDLIST: api + 'banner/detail', //获取视频
    SHOWORHIDE: api + 'banner/enable', //是否显示
    UPDATE: api + 'banner/update', //编辑
    PAGE: api + 'banner/page', // 分页
    DELETE: api + 'banner/delete', // 删除
  },
  // 依享潮流
  PRODUCTMANAGE: {
    FINDPAGE: api + 'video/page', //获取分页
    EDITLIST: api + 'video/insert', //新增
    DETAIL: api + 'video/detail', //详情
    DELETE: api + 'video/delete', //移除
    UPDATA: api + 'video/update', //修改
    ENABLE: api + 'video/enable', // 显示隐藏
  },
  // 依品分类
  CATEGORY: {
    PAGE: api + 'category/page', // 分页
    DETAIL: api + 'category/detail', // 详情
    INSERT: api + 'category/insert', // 新增
    UPDATE: api + 'category/update', // 修改
    LIST: api + 'category/list', // 列表
    DELETE: api + 'category/delete', // 移除
  },
  //依品管理
  PRODUCT: {
    FINDPAGE: api + 'product/delete', // 删除
    DETAIL: api + 'product/detail', //详情
    INSERT: api + 'product/insert', //新增
    PAGE: api + 'product/page', //分页
    UPDATE: api + 'product/update', //修改
  },
  //艺术伊维斯
  ART: {
    FINDVAL: api + 'about/find_value', // 搜索内容
    SETVAL: api + 'about/set_value', // 设置内容
  },
  //艺术插画
  ARTINSRT: {
    FINDVAL: api + 'art/find_value', // 搜索内容
    SETVAL: api + 'art/set_value', // 设置内容
  },
  //内衣研究院
  RESEARCH: {
    FINDVAL: api + 'research/find_value', //搜索内容
    SETVAL: api + 'research/set_value', //设置内容
  },
  // vip中心接口
  VIPCENTER: {
    FINDVAL: api + 'vip/find_value', //搜索内容
    SETVAL: api + 'vip/set_value', //设置内容
  },

  // 门店形象
  SHOP: {
    DELETE: api + 'shop/delete', //删除
    DETAIL: api + 'shop/detail', //详情
    FIND: api + 'shop/find_cities', //城市列表
    FINDSAERCH: api + 'shop/find_citise_by_search', //城市列表筛选
    PROVINCE: api + 'shop/find_provinces', //省份列表
    PROVINCESEARCH: api + 'shop/find_provinces_by_search', //省份列表
    PAGE: api + 'shop/page', //分页
    UPDATE: api + 'shop/update', //修改
    INSERT: api + 'shop/insert', //新增
  },
  //系统设置
  SYSTEMSET: {
    PAGELIST: api + 'sys_var/index', //系统设置页面数据
    UPDATE: api + 'sys_var/update', // 修改
  },
  //系统设置
  // SYSTEMSET: {
  //   PAGELIST: api + 'sys_var/index', //系统设置页面数据
  //   UPDATE: api + 'sys_var/update', // 修改
  // },
  // 权限接口
  AUTHOR: {
    INSERT: api + 'menu/insert', //新增
    LIST: api + 'menu/list', //列表
  },
  //角色管理
  ROLE: {
    INSERT: api + 'role/delete', // 删除
    DETAIL: api + 'role/detail', // 详情
    INSERT: api + 'role/insert', // 新增
    LIST: api + 'role/list', // 列表
    PAGE: api + 'role/page', // 分页
    UPDATE: api + 'role/update', // 修改
  },

  //图片上传得到地址
  SYSTEM: {
    ADMINUPLOADFILE: domain + 'base/admin/getOSSUploadUrl',   //图片上传得到地址
  },

}
export default CONSTANT;

