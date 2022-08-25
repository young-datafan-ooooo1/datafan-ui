<!--
 * @Description: 页面标题组件
 * @Date: 2021-08-12 15:58:57
 * @LastEditTime: 2022-08-22 11:23:00
-->

<template>
  <div class="page-title" :style="cssVars">
    <span class="page-title__label">{{ title }}</span>
    <div class="page-title__action">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageTitle',
  props: {
    // 页面标题
    title: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '16px'
    }
  },
  computed: {
    cssVars() {
      return {
        "--fontsize": this.size
      };
    }
  }
}
</script>

<style lang="less" scoped>
.page-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;
    &__label {
      display: flex;
      align-items: center;
      color: #44454D;
      font-weight: 500;
      font-size: var(--fontsize);
      line-height: 22px;
      &::before {
        margin-right: 15px;
        width: 4px;
        height: var(--fontsize);
        border-radius: 2px;
        background: #F36F4E;
        content: '';
      }
    }
    &__action {
      .ant-btn {
        padding-right: 15px;
        padding-left: 15px;
        height: 36px;
        border-radius: 6px;
        font-weight: 500;
        font-size: 14px;
        line-height: 1.25;
        & + .ant-btn {
          margin-left: 10px;
        }
      }
    }
  }
</style>
