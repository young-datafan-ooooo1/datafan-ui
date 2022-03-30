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
    },
    {
      title: '内置样式',
      path: '/components/built-in-style'
    }, {
      title: '组件中心',
      collapsable: false,
      children: [
        '/components/empty',
        '/components/full-loading',
        '/components/page-title',
        '/components/page-handle',
        '/components/rules',
        '/components/input-lengthlimit',
        '/components/confirm-list',
        '/components/more-popover',
        '/components/large-select',
        '/components/transfer-modal',
        '/components/navigation',
        '/components/resizable',
      ]
    }, {
      title: '内部组件',
      collapsable: false,
      children: [
        '/components/private/',
        '/components/private/s-layout/layout',
        '/components/private/s-header/header',
        '/components/private/s-menu/menu',
        '/components/private/permission',
        '/components/private/s-table/',
        '/components/private/s-dict-select/',
        '/components/private/watermark/watermark',
      ]
    }
  ]
}

