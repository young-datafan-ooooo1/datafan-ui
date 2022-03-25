# SHeader头部导航条
 
 用于左侧菜单导航

 ## 基本用法

 #### 在项目根目录的package.json文件中添加"@sense70/common-component-vue": "~1.5.0",执行 yarn install或者npm install
 ![acatar](../s-layout/s-layout.jpg)

 ::: demo

 ```html
 <template>
  <SMenu
    :menu-data="[]"
    :collapsed="true"
    :all-open-keys="[]"
    :collapsible="true"
    @toggleCollapse="toggleCollapse"
  />
</template>
:::
## API

### Props

|参数|说明|类型|默认值|
|---|---|---|---|
|node-en-name|平台英文名称和资源菜单里面的权限标识对应|`String`|-|
|menu-data|菜单列表|Array|-|
|collapsed|当前收起状态|`Boolean`|-|
|collapsible|收否可收起|`Boolean`|true|
|toggleCollapse|点击收起展开按钮触发的方法，用于保存收取状态|`String`|-|