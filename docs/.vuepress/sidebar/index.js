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
    {
        title: '开发手册',
        path: '/document/'
    },
    {
        title: 'Pinia 新一代状态管理',
        path: '/document/pinia'
    },
    {
        title: 'TypeScript',
        path: '/document/TypeScript'
    }
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
        '/components/confirm-list',
        '/components/more-popover',
        '/components/large-select',
        '/components/transfer-modal',
        '/components/navigation',
        '/components/resizable',
        '/components/breadcrumb',
      ]
    }, {
      title: '内部组件',
      collapsable: false,
      children: [
        '/components/private/',
        '/components/private/layout/layout',
        '/components/private/header/header',
        '/components/private/menu/menu',
        '/components/private/permission',
        '/components/private/table/',
        '/components/private/dict-select/',
        '/components/private/navigation-comp',
        '/components/private/watermark/watermark',
      ]
    }
  ]
}

