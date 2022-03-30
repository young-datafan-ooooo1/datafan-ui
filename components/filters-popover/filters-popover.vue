<!--
 * @Description: 筛选条件popover
-->
<template>
  <a-popover
    placement="bottom"
    trigger="click"
    overlay-class-name="filters-popover"
  >
    <template slot="content">
      <div class="filters-content">
        <div class="filters-content__header">筛选过滤条件</div>
        <div class="filters-content__list">
          <slot/>
        </div>
        <div class="filters-content__footer">
          <slot name="footer" />
        </div>
      </div>
    </template>
    <a-button class="filters-btn" ghost type="primary">
      筛选过滤
      <a-icon type="filter" />
    </a-button>
  </a-popover>
</template>

<script>
export default {
  name: 'PageHandlePopover'
}
</script>

<style lang="less" >
@input-bg-color: #fff;
/* 筛选条件-内容样式  */
.filters-content {
  min-width: 270px;
  &__header {
    display: flex;
    align-items: center;
    padding: 25px;
    height: 40px;
    border-bottom: 1px solid #eee;
    color: #44454d;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    &::before {
      margin-right: 12px;
      width: 3px;
      height: 14px;
      border-radius: 1px;
      background: linear-gradient(180deg, #f69c66 0%, #ffb572 100%) #f36f4e;
      content: '';
    }
  }
  &__list {
    padding: 10px 25px;
  }
  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 25px;
    height: 55px;
    border-top: 1px solid #eee;
  }
}
.filters-btn {
  padding: 0 18px !important;
  height: 40px !important;
  border-radius: 6px !important;
  background-color: #ffffff !important;
}
</style>

<style lang="less">
/* 筛选条件弹出层 */
.filters-popover {
  .ant-popover-arrow {
    top: 8px !important;
    box-shadow: -1px -1px 1px #f9b6a1 !important;
  }
  .ant-popover-inner {
    border: 1px solid #f9b6a1;
    border-radius: 6px;
    box-shadow: 0px 4px 8px 0px rgb(28 41 90 / 4%);
  }
  .ant-popover-inner-content {
    padding: 0px;
  }
}
</style>
