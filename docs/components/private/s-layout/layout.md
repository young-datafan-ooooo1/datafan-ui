# SLayout 整体布局
 
 用于首页的布局

 ## 基本用法
 适用于首页排版
 #### 在项目根目录的package.json文件中添加依赖"@sense70/common-component-vue": "~1.5.0",执行 yarn install或者npm install
 ![acatar](./layout.png)
 
 ```html
 <template>
  <SLayout>
    <div slot="header">
     <p>这里是头部导航</p>
    <div slot="menu">
      <p>这里是左侧菜单导航</p>
    </div>
    <div slot="content" class="content-item">
      <p>这里是内容区域</p>
    </div>
  </SLayout>
</template>
```