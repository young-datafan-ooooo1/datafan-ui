<p align="center">
  <a href="https://vuepress.vuejs.org/" target="_blank">
    <img width="180" src="https://ui.young-datafan.com/logo.png" alt="logo">
  </a>
</p>


# DataFan UI

[![License](https://img.shields.io/badge/license-Apache%202-4EB1BA.svg)](https://www.apache.org/licenses/LICENSE-2.0.html)

这是包含 `https://ui.young-datafan.com/` 的所有源代码的存储库。
本指南将指导您如何为 DataFan-UI 的网站做出贡献。


## 分支
develop 为默认主分支，修改请先fork到自己的仓库，然后在分支上进行开发修改。
```
develop  #默认分支
```

## 使用

```
yarn install        #安装依赖
yarn docs:dev       #运行开发环境，查看文档库
yarn docs:build     #打包文档库，生成dist静态文件
```

## 目录结构
```
├── assets                  #资源目录  
│   ├── fonts                   #字体图标库
│   └── css                     #样式库
│   │ 
├── components              #组件库代码
│   └── table                   #组件文件夹
│   │   └── index.js               #组件代码
│   │ 
├── docs                        #文档库相关
│   ├── .vuepress                   #vuepress相关配置
│   │   ├── public                  #静态资源
│   │   ├── nav                     #导航内容配置
│   │   ├── sidebar                 #左侧菜单配置
│   │   ├── styles                  #自定义样式
│   │   │   ├── index.styl          #css样式覆盖
│   │   │   └── palette.styl        #主题变量覆盖
│   │   ├── config.js               #vuepress配置
│   │   └── enhanceApp.js           #类似vue项目main.js
│   │ 
│   ├── components              #组件相关文档目录
│   ├── guide                   #规范相关文档目录
│   └── README.md               #文档库首页md配置
│ 
├── utils                   #工具方法
├── scripts                 #文档自动发布配置
└── package.json            #依赖项&指令配置

```
