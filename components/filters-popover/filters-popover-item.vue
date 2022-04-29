<!--
 * @Description: 单个筛选过滤内容
 * @Date: 2022-03-29 10:17:00
-->
<template>
  <div class="filters-content__item" :label="label">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'PageHandlePopoverItem',
  props: {
    label: {
      type: String,
      default: () => ''
    }
  }
}
</script>

<style lang="less" scoped>
@input-bg-color: #fff;
.filters-content__item {
    display: flex;
    height: 36px;
    border-radius: 6px;
    background-color: #edeef2;
    &::before {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      justify-content: center;
      width: 80px;
      height: 100%;
      border-radius: 6px 0 0 6px;
      background-color: #aeb7c4;
      color: #fff;
      content: attr(label);
      font-size: 12px;
    }
    & + .filters-content__item {
      margin-top: 10px;
    }
    /deep/ input {
      padding-right: 25px;
      padding-left: 25px;
      height: 100%;
      border-radius: 0 6px 6px 0;
      background-color: @input-bg-color;
    }

    /deep/ .ant-calendar-picker-input {
      display: flex;
      padding-right: 0;
      padding-left: 0;
      height: 100%;
      border-radius: 0 6px 6px 0;
      background-color: @input-bg-color;
      .ant-calendar-range-picker-input {
        flex: 1;
        padding-right: 0;
        padding-left: 0;
      }
    }
    /deep/ .ant-select {
      width: 100%;
      .ant-select-arrow {
        top: 50%;
      }
      .ant-select-selection__clear {
        top: 50%;
      }
      .ant-select-selection {
        height: 100%;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        background-color: @input-bg-color;;
      }
      .ant-select-selection__rendered {
        margin-right: 25px;
        margin-left: 25px;
        height: 100%;
        line-height: 34px;
      }
      .ant-select-selection--multiple {
        padding-bottom: 0;
        .ant-select-selection__rendered {
          margin-right: 20px;
          margin-left: 20px;
          ul > li {
            margin-top: 5px;
          }
        }
        .ant-select-search--inline .ant-select-search__field {
          width: 5px;
        }
      }
    }
  }
</style>
