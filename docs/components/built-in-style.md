# 内置样式

DataFan UI 内置样式，请确保您已经引用了`@young-datafan/datafan-ui/assets/style/index.less`样式文件。

## 状态颜色

不同状态的颜色区分，比如表格状态列中的颜色使用。

::: demo

```html
<template>
  <p>
    <span class="success-color">成功</span>
    <span style="font-size: 14px;color: #666;"> -- 表示成功、通过、启用的状态颜色</span>
  </p>
  <p>
    <span class="fail-color">失败</span>
    <span style="font-size: 14px;color: #666;"> -- 表示失败、拒绝的状态颜色</span>
  </p>
  <p>
    <span class="progress-color">进行中</span>
    <span style="font-size: 14px;color: #666;"> -- 表示运行中、进行中等状态颜色</span>
  </p>
  <p>
    <span class="disabled-color">失效</span>
    <span style="font-size: 14px;color: #666;"> -- 表示失效、失败、禁用的状态颜色</span>
  </p>
  <p>
    <span>默认</span>
    <span style="font-size: 14px;color: #666;"> -- 表示已完成、就绪、异常中止等状态颜色</span>
  </p>
</template>

:::

