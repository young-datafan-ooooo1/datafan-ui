<!--
 * @Description: 页面头部组件（包含筛选项、操作按钮）
 * @Date: 2021-08-12 15:37:12
 * @LastEditTime: 2021-09-14 17:35:21
-->
<template>
  <div v-if="showHanldeBox" class="page-handle">
    <!-- 筛选项 -->
    <div v-if="hasBeforeExtra" class="page-handle__filters">
      <slot name="filters" />
    </div>
    <i class="page-handle__gap" />
    <!-- 操作项 -->
    <div v-if="hasAfterExtra" class="page-handle__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHandle',
  computed: {
    // 是否存在‘筛选项’插槽控件
    hasBeforeExtra() {
      return !!this.$scopedSlots.filters
    },
    // 是否存在‘操作项’插槽控件
    hasAfterExtra() {
      return !!this.$scopedSlots.actions
    },
    // 是否展示当前组件
    showHanldeBox() {
      return this.hasBeforeExtra || this.hasAfterExtra
    }
  }
}
</script>

<style scoped lang="less">
.page-handle {
  margin-top:10px;
  margin-bottom:10px;
  display: flex;
  align-items: center;
  &__gap {
    flex: 1;
    min-width: 20px;
  }
  &__filters,
  &__actions {
    & > div {
      display: flex;
      align-items: center;
    }
  }
  &__actions {
    & > div {
      justify-content: flex-end;
    }
  }
}
</style>
