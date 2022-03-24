<template>
  <div v-if="showNavigation">
    <!-- 按钮 -->
    <div
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
      :visible="!headerBtnMenu"
      :mask-closable="false"
      :closable="false"
      width="auto"
      :header-style="{ height: 0, padding: 0 }"
      :wrap-style="{
        position: 'fixed',
        top: '60px',
        height: 'calc(100vh - 60px)'
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
        <div class="flex flex-col bg-gray-500 h-full navigation_left">
          <!-- 全部导航栏 -->
          <div
            class="all_nav_button cursor-pointer select-none flex-shrink-0"
            @click="clickAllNav"
          >
            <div class="mt-5 text-center">
              <img src="./all_nav.svg" class="mr-5 pb-1" />
              <span class="title_font">全部导航</span>
              <div class="float-right">
                <img src="./arrow_white.svg" class="my-auto mr-4" />
              </div>
            </div>
          </div>

          <!-- favorite导航栏 -->
          <div class="overflow-auto">
            <div
              @click="open_url(menu)"
              v-for="(menu, index) in favorite"
              :key="index"
              class="favorite_nav_button cursor-pointer select-none flex items-center justify-between my-2"
            >
              <div class="my-2 ml-6 inline-flex flex-shrink-1 overflow-hidden">
                <i
                  :class="[
                    'senses-icons favorite_font  mr-5',
                    `senses-icons-${
                      menu.icon ? menu.icon : 'actions-shape--except'
                    } `
                  ]"
                />
                <span class="favorite_font truncate">{{ menu.nodeName }}</span>
              </div>
              <a-icon
                @click.stop="dispatch_favorite(menu)"
                type="close"
                class="my-auto mx-4 text-white close-label"
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
            :menuData="menuData"
            :favorite="favorite"
            @dispatch_favorite="dispatch_favorite"
            @open_url="open_url"
          />
        </div>
      </div>
    </a-drawer>
  </div>
</template>

<script>
import NavigationSystem from './navigation-system.vue'
import { mapState } from 'vuex'
// import { ROUTE_URL } from '@sense70/common-component-vue'
export default {
  name: 'Navigation',
  components: { NavigationSystem },
  data() {
    return {
      headerBtnMenu: true, // 控制展开页的展开
      visibleRightPanel: true, // 展开页全部展开
      menuCategory: [],
      favorite: [], // 收藏的栏目
      showNavigation: true
    }
  },
  methods: {
    // 点击展开右边导航并实时保存
    clickAllNav() {
      localStorage.setItem(
        'components.visibleRightPanel',
        !this.visibleRightPanel
      )
      this.visibleRightPanel = !this.visibleRightPanel
    },

    // 打开链接
    open_url(menu) {
      // 为了方便开发环境也能跳转，使用环境变量跳转
      // const BASE =
      //   process.env.NODE_ENV === 'development'
      //     ? process.env.VUE_APP_API_BASE_URL.substring(
      //         0,
      //         (process.env.VUE_APP_API_BASE_URL?.length ?? 0) - 4
      //       )
      //     : ROUTE_URL
      // window.open(menu.iframe === 0 ? BASE + menu.link : menu.link)
    },

    // 更改favorite的状态并实时保存
    dispatch_favorite(menu) {
      let favorite_local = JSON.parse(
        localStorage.getItem('components.favorite') ?? '[]'
      )
      if (
        this.favorite.map((i) => this.id_str(i)).includes(this.id_str(menu))
      ) {
        const _m = menu
        favorite_local = favorite_local.filter(
          (i) => this.id_str(_m) !== this.id_str(i)
        )
      } else {
        favorite_local.push(menu)
      }
      this.favorite = favorite_local
      localStorage.setItem(
        'components.favorite',
        JSON.stringify(favorite_local)
      )
      this.$forceUpdate()
    },

    // 返回唯一id
    id_str(i) {
      return `{system:"${i.system}",nodeEnName:"${i.nodeEnName}"}`
    },
    renderComp() {
      this.showNavigation = !this?.dict?.hideNavigation
      if(this?.dict?.hideNavigation){
        return
      }

      // 生成哈希表方便操作
      const hashMenu = _.keyBy(this.menuNavigator, (i) => this.id_str(i))
      // assign 二级
      Object.assign(
        hashMenu,
        _.keyBy(
          hashMenu['{system:"stella",nodeEnName:"stella"}']?.children,
          (i) => `{system:"${i.system}",nodeEnName:"${i.nodeEnName}"}`
        ),
        _.keyBy(
          hashMenu[
            '{system:"vulcan-assets-dev",nodeEnName:"vulcan-assets-dev"}'
          ]?.children,
          (i) => `{system:"${i.system}",nodeEnName:"${i.nodeEnName}"}`
        )
      )
      // assign 三级
      Object.assign(
        hashMenu,
        _.keyBy(
          hashMenu['{system:"stella",nodeEnName:"assetDevelopment"}']?.children,
          (i) => `{system:"${i.system}",nodeEnName:"${i.nodeEnName}"}`
        ),
        _.keyBy(
          hashMenu['{system:"stella",nodeEnName:"dpDi"}']?.children,
          (i) => `{system:"${i.system}",nodeEnName:"${i.nodeEnName}"}`
        )
      )
      const ceres_demand = _.compact([
        '需求平台',
        hashMenu['{system:"ceres-demand",nodeEnName:"ceres-demand"}']
      ])
      const ceres_assets = _.compact([
        '资产平台',
        hashMenu['{system:"ceres-assets",nodeEnName:"ceres-assets"}']
      ])
      const ceres_appliance = _.compact([
        '资产应用',
        hashMenu['{system:"ceres-data",nodeEnName:"ceres-data"}'],
        hashMenu['{system:"dataExplore",nodeEnName:"dataExplore"}'],
        hashMenu['{system:"dashboard",nodeEnName:"dashboard"}'],
        hashMenu['{system:"massrelay-api",nodeEnName:"massrelay-api"}']
      ])
      const ai_platform = _.compact([
        'AI中台',
        hashMenu['{system:"stella",nodeEnName:"aiPlatform"}']
      ])
      const assets_develop = _.compact([
        '资产开发',
        hashMenu['{system:"vulcan-assets-dev",nodeEnName:"vulcan-assets-dev"}'],
        hashMenu['{system:"Stella-Sailfish",nodeEnName:"Stella-Sailfish"}'],
        hashMenu['{system:"stella",nodeEnName:"vqI"}']
      ])
      const data_integration = _.compact([
        '数据集成',
        hashMenu['{system:"stella",nodeEnName:"dpDiPlatform"}'],
        hashMenu['{system:"stella",nodeEnName:"dataExchange"}'],
        hashMenu['{system:"stella",nodeEnName:"bumbleBee"}'],
        hashMenu['{system:"stella",nodeEnName:"commander"}'],
        hashMenu['{system:"stella",nodeEnName:"externalReport"}']
      ])
      const portal = _.compact([
        '门户管理',
        hashMenu['{system:"stella",nodeEnName:"model"}'],
        hashMenu['{system:"stella",nodeEnName:"online"}'],
        hashMenu['{system:"stella",nodeEnName:"system"}']
      ])
      const _menuCategory = [
        ceres_demand,
        ceres_assets,
        ceres_appliance,
        ai_platform,
        assets_develop,
        data_integration,
        portal
      ].filter((i) => i.length > 1)
      this.menuCategory = _menuCategory

      // 对于可能更新的资源列表数据进行更新（防范与未然）
      const prefixFavorite = []
      this.favorite.forEach((i) => {
        if (hashMenu[this.id_str(i)]) {
          prefixFavorite.push(hashMenu[this.id_str(i)])
        } else {
          prefixFavorite.push(i)
        }
      })
      this.favorite = prefixFavorite
      localStorage.setItem(
        'components.favorite',
        JSON.stringify(prefixFavorite)
      )
      this.$forceUpdate()
    }
  },
  created() {
    // 初始化提取localStorage的值
    this.favorite = JSON.parse(
      localStorage.getItem('components.favorite') ?? '[]'
    )
    this.visibleRightPanel =
      localStorage.getItem('components.visibleRightPanel') === 'false'
        ? false
        : true
  },
  computed: {
    ...mapState('components', ['menuNavigator', 'dict'])
  },
  mounted() {
    this.renderComp()
  }
}
</script>

<style lang="less" scoped>
// 按钮样式
.admin-header__all-btn {
  width: 60px;
  height: 60px;
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
  &:hover {
    background: #4f484a;
  }
  &:active {
    background: #292627;
  }
}

.favorite_nav_button {
  height: 50px;
  transition-duration: 0.1s;
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
  opacity: 0;
  transition-duration: 0.1s;
  &:hover {
    transform: scale(1.4);
  }
}
</style>
