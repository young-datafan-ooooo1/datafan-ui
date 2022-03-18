<!--
 * @Description:  整体布局
 * @Date: 2022-03-17 18:36:13
-->
<template>
  <a-layout :class="['admin-layout']">
    <a-layout-header>
      <slot name="header" />
    </a-layout-header>
    <a-layout>
      <slot name="menu"/>
      <a-layout-content>
        <slot name="content"/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import { watermark } from '@sense70/common-component-vue'

export default {
  name: 'AdminLayout',
  provide() {
    return {
      adminLayout: this
    }
  },

  data() {
    return {
      minHeight: window.innerHeight - 65,
      collapsed: false,
      showSetting: false,
      drawerOpen: false
    }
  },
  watch: {
    $route(val) {
      this.setActivated(val)
    },
    layout() {
      this.setActivated(this.$route)
    },
    isMobile(val) {
      if (!val) {
        this.drawerOpen = false
      }
    }
  },
  mounted() {
    this.dict.watermark &&
      watermark.set(
        localStorage.getItem('userName') + ' ' + localStorage.getItem('account')
      )
  },
  computed: {
    ...mapState('setting', [
      'isMobile',
      'theme',
      'layout',
      'footerLinks',
      'copyright',
      'fixedHeader',
      'fixedSideBar',
      'fixedTabs',
      'hideSetting',
      'multiPage'
    ]),
    ...mapGetters('setting', ['firstMenu', 'subMenu', 'menuData', 'newMenuData', 'allOpenKeys']),
    ...mapGetters('components', ['menu', 'dict', 'nodeName']),
    sideMenuWidth() {
      return this.collapsed ? '0' : '0'
    },
    headerStyle() {
      const width =
        this.fixedHeader && this.layout !== 'head' && !this.isMobile
          ? `calc(100% - ${this.sideMenuWidth})`
          : '100%'
      const position = this.fixedHeader ? 'fixed' : 'static'
      return `width: ${width}; position: ${position};`
    },
    headMenuData() {
      const { layout, menu, firstMenu } = this
      return layout === 'mix' ? firstMenu : menu
    },
    sideMenuData() {
      const { layout, menu, subMenu } = this
      return layout === 'mix' ? subMenu : menu
    }
  },
  methods: {
    ...mapMutations('setting', ['correctPageMinHeight', 'setActivatedFirst']),
    toggleCollapse() {
      this.collapsed = !this.collapsed
      localStorage.setItem('collapsed', this.collapsed)
    },
    onMenuSelect() {
      this.toggleCollapse()
    },
    setActivated(route) {
      if (this.layout === 'mix') {
        let matched = route.matched
        matched = matched.slice(0, matched.length - 1)
        const { firstMenu } = this
        for (const menu of firstMenu) {
          if (matched.findIndex(item => item.path === menu.fullPath) !== -1) {
            this.setActivatedFirst(menu.fullPath)
            break
          }
        }
      }
    }
  },
  created() {
    this.correctPageMinHeight(this.minHeight - 24)
    this.setActivated(this.$route)
  },
  beforeDestroy() {
    this.correctPageMinHeight(-this.minHeight + 24)
  }
}
</script>

<style lang="less">
.admin-layout {
  height: 100vh;
  .side-menu {
    &.fixed-side {
      top: 0;
      //position: fixed;
      //height: calc(100% - 64px);
      left: 0;
    }
  }
  .ant-layout-sider-collapsed {
    flex: 0 0 60px !important;
    min-width: 60px !important;
    max-width: 60px !important;
    width: 60px !important;
  }
  .virtual-side {
    transition: all 0.2s;
  }
  .virtual-header {
    opacity: 0;
    transition: all 0.2s;
    &.fixed-tabs.multi-page:not(.fixed-header) {
      height: 0;
    }
  }
  .ant-layout-sider-children {
    height: 100%;
  }
  .admin-layout-main {
    .admin-header {
      top: 0;
      right: 0;
      overflow: hidden;
      transition: all 0.2s;
      &.fixed-tabs.multi-page:not(.fixed-header) {
        height: 0;
      }
    }
  }
  .admin-layout-content {
    height: auto;
    /*overflow-x: hidden;*/
  }
  .setting {
    width: 40px;
    height: 40px;
    border-radius: 5px 0 0 5px;
    font-size: 22px;
    line-height: 40px;
  }
}
</style>
<style>
.ant-layout-header {
  padding: 0 0 !important;
  height: 60px !important;
  line-height: 60px !important;
}
</style>

