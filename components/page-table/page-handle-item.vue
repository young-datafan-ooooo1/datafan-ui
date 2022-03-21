<!--
 * @Description: 页面头部组件控件项
 * @Date: 2021-08-12 16:31:29
 * @LastEditTime: 2021-09-26 14:51:09
-->
<template>
  <div class="page-handle__item">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'PageHandleItem'
}
</script>

<style scoped lang="less">
.page-handle__item {
  display: flex;
  align-items: center;
  & + .page-handle__item {
    margin-left: 10px;
  }
  /* 输入框样式 */
  /deep/ .ant-input {
    width: 180px;
    height: 40px;
    border-radius: 6px;
    line-height: 38px;
  }
  /* 下拉框样式 */
  & > .ant-select{
    width: 180px;
    border-radius: 6px;
    /deep/ .ant-select-selection, /deep/ .ant-select-selection__rendered {
      height: 40px;
      border-radius: 6px;
      line-height: 38px;
    }
  }
  /* 日期范围框样式 */
  /deep/ .ant-calendar-picker-input.ant-input {
    width: 340px;
    height: 40px;
    line-height: 1;
    .ant-calendar-range-picker-separator {
      vertical-align: text-top;
    }
  }
  /* 按钮样式 */
   & > button {
    padding-right: 10px;
    padding-left: 10px;
    min-width: 70px;
    height: 26px;
    border-radius: 32px;
    font-size: 13px;
    line-height: 1 !important;
    /* 筛选过滤按钮 */
    &.filter-btn {
      padding-right: 18px;
      padding-left: 18px;
      height: 40px;
      border-radius: 6px;
      background-color: #ffffff !important;
    }
    /* 查询按钮 */
    &.search-btn {
      padding-right: 10px;
      padding-left: 10px;
      height: 36px;
      border-radius: 6px;
      font-size: 14px;
    }
  }
}
</style>
