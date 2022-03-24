module.exports = {
  theme: '',
  title: 'DataFan UI',
  description: '所有的伟大，都源于一个勇敢的开始',
  logo: '/logo.png',
  base: '/',
  port: '8080',
  themeConfig: {
    // 配置顶部导航栏
    nav: require('./nav'),
    // 配置侧边栏部分
    sidebar: require('./sidebar'),
    sidebarDepth: 2,
  },
  chainWebpack (config) {
    config.resolve.alias.set('core-js/library/fn', 'core-js/features');
  },
  head: [],
  plugins: ['demo-container'], // 配置插件
  markdown: {}
}
