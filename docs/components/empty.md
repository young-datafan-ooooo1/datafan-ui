
# Empty 空状态

当内容为空时，使用空状态组件提示。

## 基本用法

适用大部分默认场景

::: demo

```html
<DEmpty />

```
:::


## 配置属性

根据场景自定义提示

::: demo

```html
<DEmpty text="这里是提示" description="这里是详细说明" />
  
```

:::

## API

### Props

|参数|说明|类型|默认值|
|---|---|---|---|
|text|空状态提示|`String`|`暂无数据`|
|description|空状态提示详情|`String`|-|
|color|提示字体颜色|`String`|-|
