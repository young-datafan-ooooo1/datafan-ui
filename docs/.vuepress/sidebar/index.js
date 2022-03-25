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
    }, {
      title: '组件中心',
      collapsable: false,
      children: [
        '/components/empty',
        '/components/select'
      ]
    }, {
      title: '内部组件',
      collapsable: false,
      children: [
        '/components/private/',
        '/components/private/s-dict-select/',
      ]
    }
  ]
}

