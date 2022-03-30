<!--
 * @Description: 更多popover弹框
-->
<template>
  <a-popover placement="bottom" overlay-class-name="more-popover" trigger="hover">
    <template slot="content">
      <ul class="more-content">
        <slot />
      </ul>
    </template>
    <a-icon type="ellipsis" class="icon-btn" />
  </a-popover>
</template>

<script>
export default {
  name: 'MorePopover'
}
</script>

<style lang="less" scoped>
/* 更多操作按钮弹出层-列表样式 */
.more-content {
  margin: 0;
  padding: 0;
  list-style: none;
  /deep/ li {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 80px;
    height: 28px;
    color: #f36f4e;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
    &:hover {
      background-color: #fffbf7;
    }
    & + li {
      margin-top: 5px;
    }
  }
}
</style>

<style lang="less">
// 更多按钮弹出框样式
.more-popover.ant-popover {
  &.ant-popover-placement-top {
    .ant-popover-content {
      .ant-popover-arrow {
        bottom: 16px;
        background: #fff;
        box-shadow: -1px -1px 1px #f9b6a1;
        transform: rotate(225deg);
        transform-origin: bottom;
      }
    }
  }
  &.ant-popover-placement-bottom {
    .ant-popover-content {
      .ant-popover-arrow {
        top: 8px;
        background: #fff;
        box-shadow: -1px -1px 1px #f9b6a1;
      }
    }
  }
  .ant-popover-inner {
    border: 1px solid #f9b6a1;
    border-radius: 10px;
    box-shadow: 0px 4px 8px 0px rgb(28 41 90 / 4%);
  }
  .ant-popover-inner-content {
    padding: 5px;
  }
}
</style>
