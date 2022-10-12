<template>
  <div v-if="showNavigation">
    <!-- 按钮 -->
    <div
      :style="{height:`${iconHeight}px`,width:`${iconHeight}px`}"
      class="admin-header__all-btn"
      :class="
        headerBtnMenu ? 'header-icon-status-menu' : 'header-icon-status-cross'
      "
      @click="headerBtnMenu = !headerBtnMenu"
    >
      <span />
      <span />
      <span />
    </div>
    <!-- 展开 -->
    <a-drawer
      id="__ss-slider-drawer-container"
      placement="left"
      :maskClosable="maskClosable"
      :visible="!headerBtnMenu"
      :mask-closable="false"
      :closable="false"
      width="auto"
      :header-style="{ height: 0, padding: 0 }"
      :wrap-style="{
        position: 'fixed',
        top: `${iconHeight}px`,
        height: `calc(100vh - ${iconHeight}px)`
      }"
      :body-style="{
        padding: 0,
        display: 'flex',
        height: '100%',
        overflow: 'hidden'
      }"
      @close="headerBtnMenu = true"
      ><div class="flex">
        <!-- 左侧区域 -->
        <div class="navigation_left">
          <!-- 全部导航栏 -->
          <div
            class="all_nav_button"
            @click="clickAllNav"
          >
            <div class="outer">
              <img src="./all_nav.svg" class="title" />
              <span class="title_font">全部导航</span>
              <div class="float-right">
                <img src="./arrow_white.svg" class="inner" />
              </div>
            </div>
          </div>

          <!-- favorite导航栏 -->
          <div class="overflow-auto">
            <div
              @click="open_url(menu)"
              v-for="(menu, index) in favorite"
              :key="index"
              class="favorite_nav_button"
            >
              <div class="name">
                <i
                  :class="[
                    'datamp-icons favorite_font  mr-5',
                    `datamp-icons-${
                      menu.icon ? menu.icon : 'actions-shape--except'
                    } `
                  ]"
                />
                <span class="favorite_font truncate">{{ menu.nodeName }}</span>
              </div>
              <a-icon
                @click.stop="dispatch_favorite(menu)"
                type="close"
                class=" close-label"
              />
            </div>
          </div>
        </div>
        <!-- 右侧区域 -->
        <div
          :class="visibleRightPanel ? undefined : 'is_invisible'"
          class="right_panel"
        >
          <NavigationSystem
            v-for="(menuData, index) in menuCategory"
            :key="index"
            :replaceKey="replaceKey"
            :menuData="menuData"
            :favorite="favorite"
            @dispatch_favorite="dispatch_favorite"
            @open_url="open_url"
          >
            <template #title="{menu}">
              <slot name="title" :menu="menu"/>
              </template>
          </NavigationSystem>
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import NavigationSystem from './navigation-system.vue'
export default {
  name: 'Navigation',
  components: { NavigationSystem },
  props: {
    replaceKey:{
      // 判断项（用于收藏）的key值
      type:String,
      default(){
        return 'key'
      }
    },
    iconHeight:{
      // 按钮高度
      type:Number,
      default(){
        return 60
      }
    },
    favorite:{
      // 收藏的栏目
      type:Array,
      default(){
        return []
      }
    },
    menuCategory:{
      // 菜单栏目
      type:Array,
      default(){
        return []
      }
    },
    visibleRightPanel:{
      // 右侧导航栏展开状态
      type:Boolean,
      default:true
    },
    maskClosable:{
      // 右侧导航栏展开状态
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      headerBtnMenu: true, // 控制展开页的展开
      showNavigation: true
    }
  },
  methods: {
    // 点击展开右边导航并实时保存
    clickAllNav() {
      this.$emit('expand')
    },

    // 打开链接
    open_url(menu) {
      // 为了方便开发环境也能跳转，使用环境变量跳转
      this.$emit('click',menu)
    },

    // 更改favorite的状态并实时保存
    dispatch_favorite(menu) {
      this.$emit('fav',menu)
    },

  },
}
</script>

<style lang="less" scoped>
// 按钮样式
.admin-header__all-btn {
  border-radius: 0px 6px 6px 0px;
  background: #f36f4e;
  text-align: center;
  font-size: 1rem;
  transition: all 0.2s ease-out 0s;
  &:hover {
    background: #f78264;
  }
  &:active {
    background: #ee623f;
  }
  > span {
    position: absolute;
    left: 18px;
    display: block;
    width: 20px;
    height: 2px;
    background: rgb(255, 255, 255);
    transition: all 0.3s ease-out 0s;
  }
}

.header-icon-status-menu {
  span:first-child {
    top: 20px;
    transform: rotate(0deg);
    transform-origin: left center;
  }
  span:nth-child(2) {
    top: 27px;
  }
  span:nth-child(3) {
    top: 34px;
    transform: rotate(0deg);
    transform-origin: left center;
  }
}
// cross状态
.header-icon-status-cross {
  border-radius: 0;
  span:first-child {
    top: 20px;
    left: 22px;
    transform: rotate(45deg);
    transform-origin: left center;
  }
  span:nth-child(2) {
    top: 27px;
    opacity: 0;
  }
  span:nth-child(3) {
    top: 34px;
    left: 22px;
    transform: rotate(-45deg);
    transform-origin: left center;
  }
}

.flex{
  display: flex;
}

.float-right{
  float:right;
}

.overflow-auto{
  overflow:auto
}

.mr-5{
  margin-right: 1.25rem; 
}

.truncate{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; 
}

// 展开样式
.ant-drawer-left.ant-drawer-open /deep/.ant-drawer-content-wrapper {
  box-shadow: none;
}
/deep/.ant-drawer-content {
  background-color: #00000000 !important;
}
/deep/.ant-drawer-content-wrapper {
  max-width: 820px;
}
.navigation_left {
  z-index: 1;
  flex-shrink: 0;
  width: 220px;
  background-color: #2d2e31;
  display: flex; 
  flex-direction: column; 
  height: 100%; 
}
.right_panel {
  overflow: auto;
  padding-bottom: 1rem;
  background: #3f393b;
  transition-duration: 0.2s;
  &.is_invisible {
    transform: translateX(-100%);
  }
}

.all_nav_button {
  height: 64px;
  background: #3f393b;
  transition-duration: 0.1s;
  flex-shrink: 0; 
  cursor: pointer; 
  user-select: none; 
  &:hover {
    background: #4f484a;
  }
  &:active {
    background: #292627;
  }
  .outer {
    margin-top: 1.25rem; 
    text-align: center; 
  }
  .title{
    padding-bottom: 0.25rem; 
    margin-right: 1.25rem; 

  }
  .inner{
    margin-right: 1rem; 
  }
}

.favorite_nav_button {
  height: 50px;
  transition-duration: 0.1s;
  display: flex; 
  margin-top: 0.5rem;
  margin-bottom: 0.5rem; 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  cursor: pointer; 
  user-select: none; 
  .name{
    display: inline-flex; 
    overflow: hidden; 
    margin-top: 0.5rem;
    margin-bottom: 0.5rem; 
    margin-left: 1.5rem; 
    display: inline-flex; 

  }
  &:hover {
    background: #f36f4e7b;
    .close-label {
      opacity: 1;
    }
    .favorite_font {
      color: white;
    }
  }
  &:active {
    background: #292627;
  }
}

.title_font {
  color: #ffffff;
  font-weight: 500;
  font-size: 16px;
}
.favorite_font {
  color: #9fa5b3;
  transition-duration: 0.1s;
}
.close-label {
  margin-left: 1rem;
  margin-right: 1rem; 
  color: #ffffff; 
  opacity: 0;
  transition-duration: 0.1s;
  &:hover {
    transform: scale(1.4);
  }
}
</style>
