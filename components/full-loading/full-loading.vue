<!--
 * @Description: 全局loading组件
 * @Date: 2022-03-07 19:10:50
-->

<template>
  <a-spin :tip="tip" :class="`s-full-loading ${show ? 's-full-loading--open' : 's-full-loading--close'}`"/>
</template>

<script>
export default {
  name: 'FullLoading',
  components: {
    ASpin: () => import('ant-design-vue/lib/spin')
  },
  data () {
    return {
      show: false, // 是否展示laoding提示
      tip: ''      // laoding提示文字
    }
  }
}
</script>

<style lang="less" scoped>
.s-full-loading {
  position: fixed;
  top: 0;
  z-index: 9999;
  display: flex;
  visibility: hidden;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  opacity: 0;

  user-select: none;
  &.s-full-loading--open {
    animation: fadeIn .3s 1;

    animation-fill-mode: forwards;
  }
  &.s-full-loading--close {
    animation: fadeOut .3s 1;

    animation-fill-mode: forwards;
  }
  /deep/ .ant-spin-text {
    margin-top: 10px;
  }
  @keyframes fadeIn
  {
    from {
      visibility: visible;
      opacity: 0;
    }
    to {
      visibility: visible;
      opacity: 1;
    }
  }
  @keyframes fadeOut
  {
    from {
      visibility: visible;
      opacity: 1;
    }
    to {
      visibility: hidden;
      opacity: 0;
    }
  }
}
</style>
