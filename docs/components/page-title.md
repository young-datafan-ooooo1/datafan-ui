# PageTitle 页面标题

列表页面的标题组件，用于表明当前所在页面。

## 基本用法

无slot使用方式

::: demo

```html
  <DPageTitle title="页面/段落标题"/>

```
:::


## 插槽使用

slot的使用方式，建议`新建`等主要功能放置此slot下。

::: demo

```html
  <DPageTitle title="我是标题">
    <a-button type="primary" icon="plus">新建</a-button>
  </DPageTitle>

```
:::


## API

### Props

|参数|说明|类型|默认值|
|---|---|---|---|
|title|标题|`String`|-|


### Slots

|名称|说明|默认值|
|---|---|---|
|`默认插槽`|操作项区域|-|

