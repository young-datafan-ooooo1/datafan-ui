<template>
  <div class="resizable" :class="vertical && 'flex-col'">
    <div id="icon" ref="icon">
      <i class="datamp-icons datamp-icons-actions-drag--horizontal" />
    </div>
    <!-- start -->
    <div ref="start" class="resize-box-start" :class="vertical && 'flex'">
      <div
        :class="vertical ? 'vertical' : 'horizontal'"
        :style="
          vertical
            ? { minHeight: _min, maxHeight: _max, width: _initWidth }
            : { minWidth: _min, maxWidth: _max, width: _initWidth }
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
    initWidth: {
      type: [Number, String],
      required: false
    },
    min: {
      type: [Number, String],
      default: 300
    },
    max: {
      type: [Number, String],
      default: 800
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
      return _.isNumber(this.min) ? `${this.min}px` : `${this.min}`
    },
    _max() {
      return _.isNumber(this.max) ? `${this.max}px` : `${this.max}`
    },
    _initWidth() {
      if(_.isUndefined(this.initWidth)) {
        return 'auto'
      }
      return _.isNumber(this.initWidth) ? `${this.initWidth}px` : `${this.initWidth}`
    }
  },
  mounted() {
    (this.getChromeVersion() <= 69) && this.fixOldChrome()
  },
  methods: {
    getChromeVersion() {
      var arr = navigator.userAgent.split(' ')
      var chromeVersion = ''
      for (var i = 0; i < arr.length; i++) {
        if (/chrome/i.test(arr[i])) chromeVersion = arr[i]
      }
      if (chromeVersion) {
        return Number(chromeVersion.split('/')[1].split('.')[0])
      } else {
        return false
      }
    },
    fixOldChrome() {
      const rsz = this.$refs.start?.childNodes?.[0]
      const icon = this.$refs.icon
      document.body.appendChild(icon)

      rsz.addEventListener('mouseenter', function (e) {
        const x = e.clientX
        const y = e.clientY
        icon.style.top = y - 15 + 'px'
        icon.style.left = x - 10 + 'px'
        icon.style.visibility = 'visible'
      })

      rsz.addEventListener('mousemove', function (e) {
        const x = e.clientX
        const y = e.clientY
        icon.style.top = y - 15 + 'px'
        icon.style.left = x - 10 + 'px'
        icon.style.visibility = 'visible'
      })

      rsz.addEventListener('mouseleave', function (e) {
        icon.style.visibility = 'hidden'
      })
    }
  }
}
</script>

<style lang="less" scoped>
#icon {
  position: absolute;
  pointer-events: none;
  z-index: 100;
  visibility: hidden;
}
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
      min-height: 1px;
      transform: scaleY(500);
      // pointer-events: none;
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
      z-index: 50;
      height: 100%;
      // pointer-events: none;
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
