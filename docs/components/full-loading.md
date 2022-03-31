# FullLoading 全屏加载

当需要向用户展示加载状态并防止再次点击时，使用全屏加载提示。

## 基本用法
默认加载状态的样式

::: demo

```html
<template>
  <a-button @click="onClick">默认loading</a-button>
</template>

<script>
  export default {
    methods: {
      // 默认提示
      onClick() {
        // 调用打开loading弹层，同 this.$loading.open()
        this.$loading() 
        setTimeout(_ => {
          // 关闭loading弹层
          this.$loading.close() 
        }, 3000)
      }
    }
  }
</script>

```
:::


## 自定义提示

根据场景自定义提示

::: demo

```html
<template>
  <a-button @click="onCustomClick">自定义提示</a-button>
</template>

<script>
  export default {
    methods: {
      // 自定义提示
      onCustomClick() {
        // 调用打开loading弹层，同 this.$loading.open()
        this.$loading('自定义提示')
        setTimeout(_ => {
          // 关闭loading弹层
          this.$loading.close() 
        }, 3000)
      }
    }
  }
</script>

```
:::


