# Navigation 导航

一个高度集成的左上角点开的导航栏。

## 基本用法


::: demo

```html
<template>
  <div style="position:relative">
    <DNavigation
      @click="open_url"
      @fav="dispatch_favorite"
      @expand="clickAllNav"
      replaceKey="nodeEnName"
      :favorite="favorite"
      :visibleRightPanel="visibleRightPanel"
      :menuCategory="menuCategory"
    >
      <template #title="{ menu }">
        <div>
          <span style="color:white">{{ menu.nodeName }}</span>
        </div>
      </template>
    </DNavigation>
  </div>
</template>

<script>
  export default {
    methods: {
      // 点击展开右边导航并实时保存
      clickAllNav() {
        localStorage.setItem(
          'components.visibleRightPanel',
          !this.visibleRightPanel
        )
        this.visibleRightPanel = !this.visibleRightPanel
      },
      open_url(menu) {
        window.open(menu.link)
      },
      // 更改favorite的状态并实时保存，取消和添加共用同一个方法
      dispatch_favorite(menu) {
        let favorite_local = JSON.parse(
          localStorage.getItem('components.favorite') ?? '[]'
        )
        favorite_local.filter(i=>i.nodeEnName === menu.nodeEnName).length > 0
          ? favorite_local = favorite_local.filter(i => i.nodeEnName !== menu.nodeEnName)
          : favorite_local.push(menu)
        this.favorite = favorite_local
        localStorage.setItem(
          'components.favorite',
          JSON.stringify(favorite_local)
        )
        this.$forceUpdate()
      },
    },
    data() {
      return {
        visibleRightPanel:true,
        favorite: [], // 收藏的栏目
        menuCategory: [
          [
            '标题1',
            { nodeEnName: 'thisone', nodeName: '第一个', link:'https://github.com' },
            { nodeEnName: 'thistwo', nodeName: '第二个', link:'https://github.com' }
          ],
          [
            '标题2',
            { nodeEnName: 'thisthree', nodeName: '第三个', link:'https://github.com' },
            { nodeEnName: 'thisfour', nodeName: '第四个', link:'https://github.com' }
          ]
        ]
      }
    }
  }
</script>
```
:::

## API

## Props
| 参数              | **说明**                                                     | **类型** | 默认值 |
| ----------------- | ------------------------------------------------------------ | -------- | ------ |
| maskClosable      | 是否可以点击蒙层关闭                                         | Boolean  | true   |
| replaceKey        | 菜单条目的唯一标识符                                         | String   | "key"  |
| favorite          | 左侧的喜欢菜单                                               | Array    | []     |
| visibleRightPanel | 右侧导航栏是否展开                                           | Boolean  | true   |
| menuCategory      | 菜单条目列表（第一个为字符串代表该栏中文名，后面的为他下面的条目） | Array    | []     |

## Event
| 参数   | **说明**                                           | **类型**    |
| ------ | -------------------------------------------------- | ----------- |
| click  | 点击菜单条目的点击事件，可配置跳转页面等           | function(e) |
| fav    | 点击某个条目的喜欢按钮（取消和选中都是同一个方法） | function(e) |
| expand | 点击展开右侧导航栏                                 | function()  |
