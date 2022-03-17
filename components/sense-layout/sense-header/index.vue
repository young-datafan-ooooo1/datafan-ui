<template>
  <a-layout-header :class="[headerTheme, 'admin-header']">
    <div
      :class="['admin-header__wide', layout, pageWidth]"
      class="flex items-center justify-between"
    >

      <div class="inline-flex items-center">
        <SNavigation />
        <div class="admin-heaer__logo">
          <router-link :to="toPath">
            <img :src="ASSETS_URL+ '/common/img/stella-logo.png'" style="height: 2rem">
          </router-link>
        </div>

        <div
          class="admin-header__title"
        >
          {{ platName }}
        </div>
        <div
          v-if="layout !== 'side' && !isMobile"
          class="admin-header__menu"
          :style="`width: ${menuWidth};`"
        >
          <i-menu
            class="head-menu"
            :theme="headerTheme"
            mode="horizontal"
            :options="menuData"
            @select="onSelect"
          />
        </div>
      </div>
      
      <div :class="['admin-header__right', headerTheme]">
        <div class="header-right__info">
          <a-tooltip title="帮助" placement="bottom">
            <a-icon type="question-circle-o" @click="open_help" />
          </a-tooltip>
        </div>
        <header-avatar class="header-item header-right__avatar" />
        <a-dropdown placement="bottomCenter">
          <div class="header-right__more">
            <a-icon class="header-right__btn" type="more" />
          </div>
          <a-menu slot="overlay">
            <a-menu-item @click="logout">
              <a-icon style="margin-right: 8px;" type="poweroff" />
              <span>退出登录</span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
import HeaderAvatar from './HeaderAvatar'
import IMenu from '@/components/menu/menu'
import { mapState, mapMutations } from 'vuex'
import { logout, ROUTE_URL } from '@sense70/common-component-vue'
import { ASSETS_URL } from '@/services/api'

export default {
  name: 'AdminHeader',
  components: { IMenu, HeaderAvatar },
  props: ['collapsed', 'menuData','nodeName','nodeEnName','toPath'],
  data() {
    return {
      platName:'',
      ASSETS_URL,
      langList: [
        { key: 'CN', name: '简体中文', alias: '简体' },
        { key: 'HK', name: '繁體中文', alias: '繁體' },
        { key: 'US', name: 'English', alias: 'English' }
      ],
      searchActive: false,
    }
  },
  computed: {
    ...mapState('setting', [
      'theme',
      'isMobile',
      'layout',
      'systemName',
      'lang',
      'pageWidth'
    ]),
    ...mapState('components', ['menu', 'menuNavigator']),
    headerTheme() {
      if (
        this.layout === 'side' &&
        this.theme.mode === 'dark' &&
        !this.isMobile
      ) {
        return 'light'
      }
      return this.theme.mode
    },
    langAlias() {
      const lang = this.langList.find(item => item.key === this.lang)
      return lang.alias
    },
    menuWidth() {
      const { layout, searchActive } = this
      const headWidth = layout === 'head' ? '100% - 188px' : '100%'
      const extraWidth = searchActive ? '600px' : '400px'
      return `calc(${headWidth} - ${extraWidth})`
    }

  },
  created() {
    this.platName = document.title =
      this.menuNavigator.find((i) => i.nodeEnName === this.nodeEnName)?.nodeName ??
      this.nodeName
  },
  methods: {
    onSelect(obj) {
      this.$emit('menuSelect', obj)
    },
    logout() {
      logout()
    },
    open_help() {
      const BASE = process.env.NODE_ENV === 'development'
        ? process.env.VUE_APP_API_BASE_URL.substring(0, (process.env.VUE_APP_API_BASE_URL?.length ?? 0) - 4)
        : ROUTE_URL
      window.open(BASE + '/product-help-center/docs-demand/')
    },
    ...mapMutations('setting', ['setLang'])
  }
}
</script>

<style lang="less" scoped>
  .admin-header{
  position: relative;
  z-index: 2;
  padding: 0;
  background: #2C2E31;
  // box-shadow: @shadow-down;
  color: #ffffff;
  .admin-header__title {
    display: inline-block;
    color: #D8D8D8;
    font-size:1rem;

    user-select: none
  }
  .admin-header__all-btn {
    width: 60px;
    height: 60px;
    border-radius: 0px 6px 6px 0px;
    background: #F36F4E;
    text-align: center;
    font-size: 1rem;
  }
  .admin-heaer__logo {
    margin: 0 20px;
  }
  .head-menu{
    height: 56px;
    box-shadow: none;
    vertical-align: middle;
    line-height: 56px;
  }
  // &.dark{
  //   background: @header-bg-color-dark;
  //   color: white;
  // }
  // &.night{
  //   .head-menu{
  //     background: @base-bg-color;
  //   }
  // }
  .admin-header__wide{
    &.head.fixed{
      margin: auto;
      padding-left: 0;
      max-width: 1400px;
    }
    .logo {
      display: inline-block;
      padding: 0 12px 0 24px;
      color: inherit;
      vertical-align: top;
      font-size: 20px;
      // height: 64px;
      line-height: 58px;
      cursor: pointer;
      &.pc{
        padding: 0 12px 0 0;
      }
      img {
        vertical-align: middle;
      }
      h1{
        display: inline-block;
        color: inherit;
        font-size: 16px;
      }
    }
    .trigger {
      padding: 0 24px;
      font-size: 20px;
      cursor: pointer;
      transition: color .3s;
      &:hover{
        // color: @primary-color;
      }
    }
    .admin-header__menu{
      display: inline-block;
    }
    .admin-header__right{
      display: flex;
      float: right;
      padding-right: 30px;
      color: inherit;
      .header-right__btn {
        font-size: 1rem;
      }
      .header-item{
        align-self: center;
        padding: 0 25px;
        color: inherit;
        cursor: pointer;
        a{
          color: inherit;
          i{
            font-size: 16px;
          }
        }
      }
  
    }
  }
}

</style>
