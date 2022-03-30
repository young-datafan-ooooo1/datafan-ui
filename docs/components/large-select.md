# LargeSelect 大数据量下拉框

基于Ant Design1.x版本select组件，针对大数据量下拉框展示、滚动及查询卡顿问题封装。

## 基本用法

适用于下拉框数据量较大时（10000条数据）

::: demo

```html
<template>
    <DLargeSelect v-model="value" :data="data" placeholder="请选择"/>
  </template> 

  <script>
    export default {
      data() {
        return {
          value: '',
          data: [],
        }
      },
      mounted() {
        const list = []
        for(var i = 0; i < 10000; i++ ) {
          list.push({ value: i, title: `选项${i}` })
        }
        this.data = list
      }
    }
  </script>

  <style>
    .large-select {
      width: 150px;
    }
  </style>
```
:::


## API

### Props

|参数|说明|类型|默认值|
|---|---|---|---|
|v-model|下拉框选中项|`String|Number|Array`|-|
|data|下拉框数据源|`Array`|-|
|loading|加载状态|`Boolean`|-|
|mode|设置下拉框模式|`'default'|'multiple'|'tags'`|'default'|
|disabled|是否禁用选择|`Boolean`|false|
|show-search|是否显示搜索输入|`Boolean`|false|
|allow-clear|是否显示删除图标|`Boolean`|false|



### Events

|事件名|说明|参数|
|---|---|---|
|change|选中项改变时触发|`selectValue`|

