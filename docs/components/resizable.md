# Resizable 可伸缩布局

可快速使用纯 css layout 组件构建上下或者左右拉伸布局。

## 基本用法

::: demo

```html
<template>
  <div>
    <DResizable
      line-class="opacity-0"
      :min="250"
      :max="600"
      style="height:300px"
    >
      <template #start>
        <div style="background-color:#00000026;height:100%;width:100%;display:flex">
          <span style="margin:auto;">左方或者上方内容</span>
        </div>
      </template>

      <template #end>
        <div style="background-color:#00000056;height:100%;width:100%;display:flex">
          <span style="margin:auto">右方或者下方内容</span>
        </div>
      </template>
    </DResizable>
  </div>
</template>

```

:::

## API

### Props

| 参数       | 描述                                                             | 默认 |
| :--------- | :--------------------------------------------------------------- | :--- |
| direction  | 排列方向（字符串 x 或者 y）                                      | 'x'  |
| line-class | 拖拽线的 class（字符串）                                         | /    |
| line-style | 拖拽线的 style（字符串）                                         | /    |
| max        | start slot 内的最大宽度或高度值（数字或者字符串，字符串需带 px） | /    |
| min        | start slot 内的最小宽度或高度值（数字或者字符串，字符串需带 px） | /    |

## 注意事项

template 子元素包装在 flex box 布局下，可将子元素 flex-grow 设为 1，来自动撑开宽度。
