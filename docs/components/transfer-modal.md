# TransferModal 穿梭列表弹层

穿梭列表弹层组件，用于批量置换列表状态。

## 基本用法

适用于用户授权等场景，内置根据title大小写模糊搜索匹配。

::: demo

```html
<template>
  <a-button icon="branches" @click="grant.isShowModal = true">用户授权</a-button>
  <DTransferModal 
    v-model="grant.isShowModal" 
    :allData="grant.allUserData"
    :keyData="grant.grantUserList"
    :loading="grant.loading"
    :confirm-loading="grant.confirmLoading" 
    @ok="onConfirm"
    @cancel="onCancel"
  />
</template>

<script>
  export default {
    data() {
      return {
        grant: {
          isShowModal: false, // 是否展示授权弹窗
          confirmLoading: false, // 列表loading状态
          loading: false, // 提交loading状态
          allUserData: [], // 所有用户数据
          grantUserList: [], // 已授权数据
        }
      }
    },
    mounted() {
      const users = [
        {"userName":"张娟","userId":"1","account":"zhangjuan"},
        {"userName":"于倩倩","userId":"2","account":"yuqianqian"},
        {"userName":"刘俊","userId":"3","account":"liujun"},
        {"userName":"黄小浪","userId":"4","account":"hxl"},
        {"userName":"尹凯锋","userId":"5","account":"yinkaifeng"},
        {"userName":"李哲闻","userId":"6","account":"lizhewen"},
        {"userName":"麻晨晨","userId":"7","account":"ccma3"},
        {"userName":"david ","userId":"8","account":"sdadsad"},
        {"userName":"麻晨晨","userId":"9","account":"ccma"},
        {"userName":"姗","userId":"1","account":"10"}
      ]
      this.grant.allUserData = users.map(row => {
        return {
          key: row.userId,
          title: `${row.userName}（${row.account}）`
        }
      })
     this.grant.grantUserList = ["1", "2", "3"]
    },
    methods: {
      onConfirm(e) {
        console.log('onConfirm', e)
      },
      onCancel() {
        console.log('onCancel')
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
|title|弹窗标题|`String`|'授权'|
|titles|标题集合，顺序从左至右|`String[]`|['未授权用户列表', '已授权用户列表']|
|width|弹窗宽度|`String`|'fit-content'|
|allData|全部数据源|`[{ key: string, title: string }]`|[]|
|keyData|已选择数据|`String[]`|[]|
|loading|列表loading状态|`Boolean`|false|
|confirmLoading|提交按钮loading状态|`Boolean`|false|
|render|每行数据渲染函数，该函数的入参为数据源中的项|`Function`|`item => item.title`|
|listStyle|穿梭框的样式|`Object`|`{ width: '280px', height: '350px' }`|


### Events

|事件名|说明|参数|
|---|---|---|
|ok|弹层提交按钮点击事件|`String[]`|
|cancel|弹层关闭按钮点击事件|-|

