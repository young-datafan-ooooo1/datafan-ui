<!--
 * @Description: 数据为空提示图片/文字组件
 * @Date: 2021-09-01 18:58:43
 * @LastEditTime: 2021-11-30 14:03:31
-->
<template>
  <div class="empty" :style="`color: ${color}`">
    <img class="empty__img" :src="emptyImg" :alt="text" draggable="false">
    <p v-if="text" class="empty__text">{{ text }}</p>
    <p v-if="description" class="empty__description">{{ description }}</p>
  </div>
</template>

<script>
import { ASSETS_URL } from '@sense70/common-component-vue'

export default {
  name: 'Empty',
  props: {
    // 空数据提示
    text: {
      type: String,
      default: '暂无数据'
    },
    // 空数据提示详情
    description: {
      type: String,
      default: ''
    },
    // 提示字体颜色
    color: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 空数据提示图片
      emptyImg: `${ASSETS_URL}/common/img/table-empty.png`
    }
  }
}
</script>

<style lang="less" scoped>
.empty {
  margin-top: 20px;
  margin-bottom: 20px;
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
