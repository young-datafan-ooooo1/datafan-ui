<template>
  <div>
    <d-page-title :title="menuData[0]" class="s-page"> </d-page-title>
    <div class="content-menu">
      <div
        class="block-menu"
        v-for="(menu, index) in menuData.slice(1, menuData.length)"
        :key="index"
        @click="open_url(menu)"
      >
        <slot name="title" :menu="menu" />
        <span
          >
          <img
            @click.stop="dispatch_favorite(menu)"
            src="./actions-star--filled.svg"
            :class="[
              favorite.map((i) => i[replaceKey]).includes(menu[replaceKey])
                ? 'active'
                : 'inactive',
              'star'
            ]"
        /></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationSystem',
  props: {
    menuData: {
      type: Array
    },
    favorite: {
      type: Array
    },
    replaceKey:{
      // 判断项（用于收藏）的key值
      type:String,
    },
  },
  methods: {
    open_url(menu) {
      this.$emit('open_url', menu)
    },
    dispatch_favorite(menu) {
      this.$emit('dispatch_favorite', menu)
    }
  }
}
</script>

<style lang="less" scoped>
.s-page {
  margin: 0.5rem 1.5rem 0 1.5rem;
}
.active {
  filter: invert(87%) sepia(40%) saturate(2705%) hue-rotate(339deg) brightness(102%) contrast(97%);
  opacity: 1;
}
.inactive {
  filter: invert(67%) sepia(15%) saturate(212%) hue-rotate(179deg) brightness(94%) contrast(90%);
  opacity: 0;
}
/deep/.page-title__label {
  color: #ffffff !important;
}
.content-menu {
  width: 100%;
  display: flex;
  display: flex;
  flex-wrap: wrap;
}
.block-menu {
  display: flex;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 14rem;
  height: 2.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.1s;
  &:hover {
    background-color: #585053;
    .star {
      opacity: 1;
    }
  }
}
.star {
  width: 1.2rem;
  transition: all 0.1s;
  &:hover {
    width: 1.4rem;
  }
  &:active {
    width: 1.2rem;
  }
}
</style>
