<template>
  <div class="resizable" :class="vertical && 'flex-col'">
    <!-- start -->
    <div ref="start" class="resize-box-start" :class="vertical && 'flex'">
      <div
        :class="vertical ? 'vertical' : 'horizontal'"
        :style="
          vertical
            ? { minHeight: _min, maxHeight: _max }
            : { minWidth: _min, maxWidth: _max }
        "
      />
      <div
        :class="
          vertical
            ? `dividing-line-vertical ${lineClass}`
            : `dividing-line-horizontal ${lineClass}`
        "
        :style="lineStyle"
      />
      <div class="resize-real-box">
        <slot name="start" />
      </div>
    </div>
    <!-- end -->
    <div ref="end" class="resize-box-end">
      <slot name="end" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'Resizable',
  props: {
    min: {
      type: [Number, String],
      default: 300
    },
    max: {
      type: [Number, String],
      default: 1300
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    lineStyle: {
      type: String,
      default: ''
    },
    lineClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    vertical() {
      return ['y', 'vertical'].includes(this.direction)
    },
    _min() {
      return _.isNumber(this.min)
        ? `${this.min}px`
        : `${this.min}`
    },
    _max() {
      return _.isNumber(this.max)
        ? `${this.max}px`
        : `${this.max}`
    }
  }
}
</script>

<style lang="less" scoped>
.flex-col {
  flex-direction: column;
}
.resizable {
  display: flex;
  flex-wrap: nowrap;
  flex: 1;
  .resize-box-start {
    position: relative;
    float: left;
    overflow: hidden;

    .resize-real-box {
      position: absolute;
      top: 0;
      right: 5px;
      bottom: 0;
      left: 0;
      display: flex;
      overflow: auto;
    }

    .horizontal {
      overflow: scroll;
      width: 100%;
      height: inherit;
      opacity: 0;
      resize: horizontal;
      transform: scaleY(500);
      pointer-events: none;
      transform-origin: center top;
    }

    .dividing-line-horizontal {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      border-left: 5px solid #3b39390f;
      pointer-events: none;
      &:hover {
        border-left: 5px dashed skyblue;
      }
    }

    .vertical {
      overflow: scroll;
      z-index:50;
      height: 100%;
      pointer-events: none;
      width: inherit;
      opacity: 0;
      resize: vertical;
      transform: scaleX(500);
      transform-origin: left center;
    }
    .dividing-line-vertical {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      border-top: 5px solid #3d3d3d;
      pointer-events: none;
      &:hover {
        border-top: 10px dashed skyblue;
      }
    }
  }
  .resize-box-end {
    display: flex;
    overflow: auto;
    flex: 1;
    min-width: 0;
    height: 100%;
  }
}
</style>
