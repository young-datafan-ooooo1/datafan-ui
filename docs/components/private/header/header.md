# Header头部导航条
 
 用于首页的布局

 ## 基本用法

 #### 在项目根目录的package.json文件中添加依赖"@sense70/common-component-vue": "~1.5.0",执行 yarn install或者npm install
 头部导航条:
 ![acatar](./header.png)
 菜单导航:
 ![acatar](./header-menu.png)
 ```html
 <template>
  <SHeader
      node-en-name="'ceres-assets'"
      :menu-data="[]"
      :node-name="'资产管理平台'"
      to-path="/homePage"
      logo-url="http://192.168.10.241:18180/static/common/img/stella-logo.png"
    />
</template>
```

## API

### Props

|参数|说明|类型|默认值|
|---|---|---|---|
|node-en-name|平台英文名称和资源菜单里面的权限标识对应|`String`|-|
|menu-data|菜单导航列表|Array|-|
|node-name|平台名称|`String`|-|
|to-path|点击logo跳转的路径|`String`|-|
|logo-url|logo图片地址|`String`|-|