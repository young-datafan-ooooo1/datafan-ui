# 组件指南
组件基于Ant Design高度封装，以风格高度统一、快速完成业务功能及减少重复代码为核心。

## 安装
使用 `yarn|pnpm|npm` 来安装，充分利用 Javascript 包和工具的丰富生态系统。

``` yaml
yarn add @young-datafan/datafan-ui
# 或者 pnpm add @young-datafan/datafan-ui
# 或者 npm i @young-datafan/datafan-ui --save
```

## 使用
使用组件库及各模块样式。
``` js
// main.js

import Vue from 'vue'
import DataFanUI from '@young-datafan/datafan-ui'

// datafan-ui内置样式
import '@young-datafan/datafan-ui/assets/style/index.less'
// 列表布局及表格样式
import '@young-datafan/datafan-ui/assets/style/page-table.scss'
// 滚动条样式
import '@young-datafan/datafan-ui/assets/style/scrollbar.less'
// 字体图标库
import '@young-datafan/datafan-ui/assets/style/fonts/iconfont.css'

Vue.use(DataFanUI)

```