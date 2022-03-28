/*
 * @Description: 
 * @Date: 2022-03-25 14:07:21
 */
module.exports = {
  // 设计规范文档
  '/design/': [
    '/design/'
  ],
  // 开发手册
  '/document/': [
    '/document/'
  ],
  // 组件中心
  '/components/': [
    {
      title: '组件指南',
      path: '/components/'
    }, {
      title: '安装使用',
      path: '/components/install'
    },
    {
      title: '内置样式',
      path: '/components/built-in-style'
    },{
      title: '公共方法',
      collapsable: false,
      children: [
        '/components/public-method/',
        '/components/public-method/Srules/',
      ]
    }, {
      title: '组件中心',
      collapsable: false,
      children: [
        '/components/empty',
        '/components/full-loading',
        '/components/confirm-list',
        '/components/navigation',
        '/components/resizable',
        '/components/watermark',
        '/components/input-lengthlimit',
      ]
    }, {
      title: '内部组件',
      collapsable: false,
      children: [
        '/components/private/',
        '/components/private/s-layout/layout',
        '/components/private/s-header/header',
        '/components/private/s-menu/menu',
        '/components/private/s-dict-select/',
      ]
    }
  ]
}
