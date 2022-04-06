<!--
 * @Description: 面包屑中的每一项
 * @Date: 2022-04-06 15:37:12
-->
<template>
  <span class="d-breadcrumb-content">
    <span class="d-breadcrumb-item" @click="Jump"><slot /></span>
    <i v-if="separatorClass" class="d-breadcrumb-separator" :class="'senses-icons '+separatorClass" />
    <span v-else class="d-breadcrumb-separator">{{ separator }}</span>
  </span>
</template>

<script>
export default {
  name: 'breadcrumbItem',
  inject: ['DBreadcrumb'],
  props: {
    to: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      separator: '',
      separatorClass: ''
    }
  },
  computed: {},
  mounted() {
    this.separator = this.DBreadcrumb.separator
    this.separatorClass = this.DBreadcrumb.separatorClass
  },
  methods: {
    // to
    Jump() {
      if (this.to) {
        this.$router.push(this.to)
      }
    }
  }
}
</script>

<style scoped lang="less">
.d-breadcrumb-item {
    color: #44454d;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    transition: color 0.3s;
    cursor: pointer;
    &:hover{
      color: #F36F4E;
    }
  }
  .d-breadcrumb-separator{
    margin:0 8px;
    color:rgba(0,10,33,.45)
  }
</style>
