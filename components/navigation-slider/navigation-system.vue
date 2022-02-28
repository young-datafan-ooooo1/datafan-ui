<template>
  <div>
    <s-page-title :title="menuData[0]" class="mx-6 mt-2"> </s-page-title>
    <div class="flex flex-wrap content-menu">
      <div
        class="block-menu w-56 h-10 rounded px-4 py-2 mx-6 my-1 
        items-center cursor-pointer flex justify-between"
        v-for="(menu, index) in menuData.slice(1, menuData.length)"
        :key="index"
        @click="open_url(menu)"
      >
        <div>
          <i
            :class="[
              'senses-icons',
              `senses-icons-${
                menu.icon ? menu.icon : 'actions-shape--except'
              } `,
              'text-gray-400',
              'mr-5',
            ]"
          />
          <span class="font-menu">{{ menu.nodeName }}</span>
        </div>
        <span
          ><i
            @click.stop="dispatch_favorite(menu)"
            :class="[
              'senses-icons senses-icons-actions-star--filled',
              favorite.map((i) => i.nodeEnName).includes(menu.nodeEnName)
                ? 'text-yellow-400 opacity-100'
                : 'text-gray-400 opacity-0',
              'star',
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
      type: Array,
    },
    favorite: {
      type: Array,
    },
  },
  // created() {
  //   this.favorite = JSON.parse(localStorage.getItem('components.favorite') ?? '[]')
  // },
  methods: {
    open_url(menu) {
      this.$emit('open_url', menu)
    },
    dispatch_favorite(menu) {
      this.$emit('dispatch_favorite', menu)
    },
  },
}
</script>

<style lang="less" scoped>
/deep/.page-title__label {
  color: #ffffff !important;
}
.content-menu {
  width: 100%;
}
.font-menu {
  font-size: 0.875rem;
  font-weight: 400;
  color: #b7b9bd;
}
.block-menu {
  transition: all 0.1s;
  &:hover {
    background-color: #585053;
    .star {
      opacity: 1;
    }
  }
}
.star {
  transition: all 0.1s;
  &:hover {
    transform: scaleY(0.5);
    font-size: 20px;
  }
  &:active {
    font-size: 14px;
  }
}
</style>
