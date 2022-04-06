<!--
 * @Description: 面包屑导航
 * @Date: 2022-04-06 15:37:12
-->
<template>
  <div class="d-breadcrumb">
    <!-- 面包项 -->
    <div class="d-breadcrumb__title">
      <slot name="title" />
    </div>
    <!-- 操作项 -->
    <div class="d-breadcrumb__actions">
      <slot name="action" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'breadcrumb',
  provide() {
    return {
      DBreadcrumb: this,
    }
  },
  props: {
    separator: {
      type: String,
      default: '>',
    },
    separatorClass: {
      type: String,
      default: '',
    },
  },
  mounted() {
    // $el Vue 实例使用的根 DOM 元素。
    const items = this.$el.querySelectorAll('.d-breadcrumb-item')
    if (items.length&&items.length===1) {
      items[items.length - 1].classList.add('d-breadcrumb-item__onlyone')
    }
  },
}
</script>

<style scoped lang="less">
.d-breadcrumb {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
  height: 36px;
  .d-breadcrumb__title {
    flex: 1;
  }
  .d-breadcrumb__actions {
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
.d-breadcrumb::before {
  margin-right: 15px;
  width: 4px;
  height: 16px;
  border-radius: 2px;
  background: #f36f4e;
  content: '';
}
</style>
