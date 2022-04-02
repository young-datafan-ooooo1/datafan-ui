# 内部组件指南
内部组件使用方法与组件中心方法大致相同，因业务相关依赖较多，使用实例以图片形式展示。
## 安装
使用 `yarn|pnpm|npm` 来安装，充分利用 Javascript 包和工具的丰富生态系统。

``` yaml
yarn add @sense70/common-component-vue
# 或者 pnpm add @sense70/common-component-vue
# 或者 npm i @sense70/common-component-vue --save
```
## 使用
使用组件库及各模块样式。
``` js
// main.js

import Vue from 'vue'
// 内部组件库
import SenseComponent from '@sense70/common-component-vue'
// 全局组件注册
Vue.use(SenseComponent)
```
## 组件版本
使用内部组件时，根据当前项目迭代版本下载对应内部组件库；如当前项目迭代为`stella-1.5`，指定组件库版本为`@sense70/common-component-vue: "~1.5.0"` 或者 `@sense70/common-component-vue: "~1.5.x"`

## 注意事项

::: warning 关于内部组件扩展
为了统一管理内部组件，如当前组件不完全满足你当前开发的功能，可讨论后优化迭代组件；避免私自修改或另写业务组件，不利于统一管理。
:::
