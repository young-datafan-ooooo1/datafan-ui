# Menu 菜单导航
 
 用于左侧菜单导航

 ## 基本用法

 ### 示例
 
 ![acatar](./menu.png)


 ``` html
 <template>
  <DMenu
    :menu-data="[]"
    :collapsed="true"
    :all-open-keys="[]"
    :collapsible="true"
    @toggleCollapse="toggleCollapse"
  />
</template>
```
## API

### Props

|参数|说明|类型|默认值|
|---|---|---|---|
|node-en-name|平台英文名称和资源菜单里面的权限标识对应|`String`|-|
|menu-data|菜单列表|Array|-|
|collapsed|当前收起状态|`Boolean`|-|
|collapsible|收否可收起|`Boolean`|true|
|toggleCollapse|点击收起展开按钮触发的方法，用于保存收取状态|`String`|-|