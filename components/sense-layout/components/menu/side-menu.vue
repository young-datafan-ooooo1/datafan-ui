<!--
 * @Description: 左侧菜单
 * @Date: 2022-03-17 10:15:45
-->
<template>
  <a-layout-sider
    v-model="collapsed"
    :theme="sideTheme"
    :class="['side-menu', 'beauty-scroll', isMobile ? null : 'shadow']"
    width="200px"
    :collapsible="collapsible"
    :trigger="null"
  >
    <i-menu
      v-if="menuData.length!==0"
      :theme="theme"
      :collapsed="false"
      :options="menuData"
      :all-open-keys="allOpenKeys"
      class="menu"
      @select="onSelect"
    />
    <a-icon v-else class="menu-loading" type="loading" />
    <div v-if="menuData.length!==0" class="menu-collapse" @click="toggleCollapse">
      <img :src="assetsUrl+ '/common/img/menu-collapse.png'" alt="menu-collapsed" :class="['menu-collapse__img', collapsed? 'collapsed': '']">
    </div>
  </a-layout-sider>
</template>

<script>
/* eslint-disable vue/attributes-order */

import IMenu from './menu'
import { mapState } from 'vuex'
import { ASSETS_URL } from '@/services/api'

export default {
  name: 'SideMenu',
  components: { IMenu },
  props: {
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: true
    },
    menuData: {
      type: Array,
      required: true
    },
    allOpenKeys: {
      type: Array,
      default: () => []
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    }
  },
  data() {
    return {
      assetsUrl: ASSETS_URL
    }
  },
  computed: {
    sideTheme() {
      return this.theme === 'light' ? this.theme : 'dark'
    },
    ...mapState('setting', ['isMobile', 'systemName'])
  },
  methods: {
    toggleCollapse() {
      this.$emit('toggleCollapse')
    },
    onSelect(obj) {
      this.$emit('menuSelect', obj)
    }
  }
}
</script>
<style lang="less" scoped>
.shadow {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}
.side-menu {
  z-index: 10;
  overflow-y: auto;
  min-height: 100%;
  .logo {
    position: relative;
    overflow: hidden;
    padding-left: 24px;
    height: 64px;
    line-height: 64px;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    &.light {
      background-color: #fff;
    }
    h1 {
      display: inline-block;
      margin: 0 0 0 12px;
      vertical-align: middle;
      font-size: 20px;
    }
    img {
      width: 32px;
      vertical-align: middle;
    }
  }
}
.menu {
  padding-top: 35px;
}
.ant-layout-sider {
  background: #3d3d44 !important;
}
.ant-menu-root .ant-menu-item,
.ant-menu-submenu-title {
  margin: 0 !important;
  padding-left: 30px !important;
  height: 50px !important;
  line-height: 50px !important;
}
.ant-menu-dark,
.ant-menu-dark .ant-menu-sub {
  background: #3d3d44 !important;
}
.ant-menu-submenu-selected .ant-menu-item-selected > a,
.ant-menu-submenu-placement-rightTop .ant-menu-item-selected > a {
  color: #f36f4e !important;
}
.ant-menu-submenu-selected,
.ant-menu-root .ant-menu-item-selected {
  background: rgba(243, 111, 78, 0.5) !important;
  color: #ffffff;
}
.ant-menu-item-selected {
  background: #f36f4e;
  color: #ffffff;
}
.ant-menu.ant-menu-dark .ant-menu-item-selected,
.ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
  background: none;
}
.ant-menu-submenu-selected .ant-menu-item-selected {
  background: none !important;
}
.ant-menu-dark .ant-menu-inline.ant-menu-sub {
  background: #2c2e31 !important;
}

.ant-menu-submenu-selected .ant-menu-item-selected .dotted {
  opacity: 1;
  transition-delay: 0.3s;
  transition-duration: 0.3s;
  transition-property: opacity;
}
.ant-menu-sub .ant-menu-item {
  margin: 24px 0px !important;
  height: 16px !important;
  line-height: 16px !important;
}

.ant-menu-inline-collapsed > .ant-menu-item,
.ant-menu-inline-collapsed
  > .ant-menu-item-group
  > .ant-menu-item-group-list
  > .ant-menu-item,
.ant-menu-inline-collapsed
  > .ant-menu-item-group
  > .ant-menu-item-group-list
  > .ant-menu-submenu
  > .ant-menu-submenu-title,
.ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title {
  padding: 0 22px !important;
}

.dotted {
  display: inline-block;
  margin: 0 15px 0 2px;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background: #f36f4e;
  opacity: 0;
  transition-delay: 0.3s;
  transition-duration: 0.3s;
  transition-property: opacity;
}
.side-menu {
  position: relative;
}
.menu-loading {
  position: absolute;
  top: 30%;
  left: 50%;
  color: #fff;
  font-size: 50px;
  transform: translateX(-50%);
}
.menu-collapse {
  position: absolute;
  right: 0;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 4px 0px 0px 4px;
  background: #545454;
}
.menu-collapse:hover {
  background: rgba(243, 111, 78, 0.5);
}
.menu-collapse__img {
  display: block;
  margin: 0 auto;
  width: 16px;
  height: 16px;
}
.menu-collapse__img.collapsed {
  transform: rotateY(180deg);
}

</style>
