# Layout 整体布局
 
 用于首页的布局

 ## 基本用法
 适用于首页排版
 ### 示例
 ![acatar](./layout.png)
 
 ```html
 <template>
  <DLayout>
    <div slot="header">
     <p>这里是头部导航</p>
    <div slot="menu">
      <p>这里是左侧菜单导航</p>
    </div>
    <div slot="content" class="content-item">
      <p>这里是内容区域</p>
    </div>
  </DLayout>
</template>
```