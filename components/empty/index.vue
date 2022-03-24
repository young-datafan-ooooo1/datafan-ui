<!--
 * @Description: 数据为空提示图片/文字组件
-->
<template>
  <div class="empty" :style="`color: ${color}`">
    <img class="empty__img" src="./empty.png" :alt="text" draggable="false">
    <p v-if="text" class="empty__text">{{ text }}</p>
    <p v-if="description" class="empty__description">{{ description }}</p>
  </div>
</template>

<script>

export default {
  name: 'Empty',
  props: {
    // 空状态提示
    text: {
      type: String,
      default: '暂无数据'
    },
    // 空状态提示详情
    description: {
      type: String,
      default: ''
    },
    // 提示字体颜色
    color: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.empty {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: auto;
  color: #AAAAAA;
  .empty__img {
    min-width: 90px;
    width: 25%;
  }
  &__text {
    margin: 10px 0 0 0;
  }
  &__description {
    margin: 5px 0 0 0;
  }
  &__text, &__description {
    font-weight: 400;
    line-height: 1;
  }
}
</style>
