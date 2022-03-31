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
  markdown: {
    extendMarkdown: (md) => {
      md.use(require('markdown-it-vuese'), { /* options */ })
    }
  },
  chainWebpack (config) {
    config.resolve.alias.set('core-js/library/fn', 'core-js/features');
  },
  head: [],
  // 配置插件
  plugins: ['demo-container'], 
  less: {
    lessOptions: {
      // If you are using less-loader@5 please spread the lessOptions to options directly
      // modifyVars: {
      //   'primary-color': '#ccc',
      //   'link-color': 'yellow',
      //   'border-radius-base': '2px',
      // },
      javascriptEnabled: true,
    },
  },
  markdown: {}
}
