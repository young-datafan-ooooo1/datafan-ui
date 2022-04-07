# ConfirmList 确认列表

当需要向用户批量确认内容时，使用确认列表组件提示。

## 基本用法

适用大部分默认场景

::: demo

```html
<template>
  <a-space>
    <a-button @click="onClick('删除')">批量删除</a-button>
    <a-button @click="onClick('下载')">批量下载</a-button>
    <a-button @click="onClick('导出')">批量导出</a-button>
  </a-space>
</template>

<script>
  export default {
    methods: {
      onClick(operation) {
        const chooseList = ['项目1', '项目2', '项目3', '项目4', '...']
        this.$confirmList({
          title: `注意：是否${operation}以下内容（${chooseList.length}）项？`,
          content: chooseList,
          onOk() {
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
        })
      }
    }
  }
</script>

```
:::



## API

### Props

|参数|说明|类型|默认值|
|---|---|---|---|
|title|标题|`String|slot`|-|
|content|提示内容列表|`String|String[]`|-|


### Events

|事件名|说明|参数|
|---|---|---|
|onOk|点击确定回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭|`function(e)`|
|onCancel|点击遮罩层或右上角叉或取消按钮的回调 promise 时 resolve 后自动关闭|`function(e)`|
