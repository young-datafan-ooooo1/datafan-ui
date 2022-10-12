# breadcrumb 面包屑导航

## 基本用法

::: demo

```html
<DBreadcrumb>
   <!-- 页面标题 --> 
  <template slot="title">
    <DBreadcrumbItem to="/components/empty.html">首页</DBreadcrumbItem>
    <DBreadcrumbItem>详情页</DBreadcrumbItem>
  </template>
  <!-- 操作项 --> 
  <template slot="action">
    <a-button type="primary" icon="plus">新建</a-button>
  </template>
</DBreadcrumb>
```

:::


## 图标分割符

::: demo

```html
<DBreadcrumb separator-class="datamp-icons-actions-send">
   <!-- 页面标题 --> 
  <template slot="title">
    <DBreadcrumbItem to="/components/empty.html">首页</DBreadcrumbItem>
    <DBreadcrumbItem>详情页</DBreadcrumbItem>
  </template>
  <!-- 操作项 --> 
  <template slot="action">
    <a-button type="primary" icon="plus">新建</a-button>
  </template>
</DBreadcrumb>
  
```

:::
## 无二级页面、无操作项

::: demo

```html
<DBreadcrumb>
   <!-- 页面标题 --> 
  <template slot="title">
    <DBreadcrumbItem >首页</DBreadcrumbItem>
  </template>
</DBreadcrumb>
  
```
:::

## API

### Breadcrumb Attributes

| 参数        | 说明           | 类型     | 默认值     |
| ----------- | -------------- | -------- | ---------- |
| separator        | 分隔符	     | `String` | `>` |
| separator-class | 图标分隔符 class | - | -          |

### Breadcrumb Item Attributes


| 参数        | 说明           | 类型     | 默认值     |
| ----------- | -------------- | -------- | ---------- |
| to        | 路由跳转	     | - | - |