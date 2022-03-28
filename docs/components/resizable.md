# Resizable 可伸缩布局

可快速使用纯 css layout 组件构建上下或者左右拉伸布局。

## 基本用法

::: demo

```html
<template>
  <div >
    <DResizable line-class="opacity-0" :min="250" :max="600">
      <template #start> 左方或者上方内容 </template>

      <template #end> 右方或者下方内容 </template>
    </DResizable>
  </div>
</template>
```

:::

## API

### Props

| 参数       | 描述                                                         | 默认 |
| :--------- | :----------------------------------------------------------- | :--- |
| direction  | 排列方向（字符串x或者y）                                     | 'x'  |
| line-class | 拖拽线的class（字符串）                                      | /    |
| line-style | 拖拽线的style（字符串）                                      | /    |
| max        | start slot内的最大宽度或高度值（数字或者字符串，字符串需带px） | /    |
| min        | start slot内的最小宽度或高度值（数字或者字符串，字符串需带px） | /    |

## 注意事项

template子元素包装在flex box布局下，可将子元素flex-grow设为1，来自动撑开宽度。
