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
        title: 'Vue3 新框架&组件',
        path: '/document/vue3/'
    },
    {
        title: 'Pinia 新一代状态管理',
        path: '/document/pinia'
    },
    {
        title: 'TypeScript',
        path: '/document/TypeScript'},
    {
        title: 'Vue3 基础知识',
        path: '/document/vue3-base'
    },
    {
        title: 'antv-X6',
        path: '/document/x6/'
    },
    {
      title: 'Promise对象',
      path: '/document/Promise/'
    },
    {
      title: '闭包和Http缓存机制',
      path: '/document/Closure/'
    },
    {
      title: 'Vue3 单元测试',
      path: '/document/vue3-unti-test'
    },
    { title: 'hook组件封装',
      path: '/document/hooks/'
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

