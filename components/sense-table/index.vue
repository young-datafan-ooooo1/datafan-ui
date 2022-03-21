<!--
 * @Description: vxe-grid表格公共封装
 * vxe-grid本身的属性/事件均可正常使用， 主要新增配置：
 * 1. 表格集成分页器  -  pagerConfig
 * 2. 将参数&API方法直接传入，代理数据获取&分页操作  -  api & filters
 * 3. 是否隐藏分页器  -  hidePager
 * 4. 少于最小页面展示条数时，自动隐藏分页器  -  autoHidePager
 * 5. 空数据模版配置  - emptyConfig
 * @Date: 2021-11-28 13:50:03
 * @LastEditTime: 2022-02-17 18:24:01
-->

<template>
  <vxe-grid
    class="sense-table"
    :loading="isLoading"
    v-bind="{
      ...gridOptions,
      ...$attrs
    }"
    v-on="$listeners"
  >
    <!-- 插槽 -->
    <template
      v-for="slot in Object.keys($scopedSlots)"
      :slot="slot"
      slot-scope="scope"
    >
      <slot :name="slot" v-bind="scope" />
    </template>
    <!-- 分页 -->
    <template #pager>
      <vxe-pager
        v-if="showPager"
        :loading="isLoading"
        v-bind="effectPager"
        @page-change="handlePageChange"
      />
    </template>
     <!-- 空数据 -->
    <template #empty>
      <Empty v-bind="emptyConfig" />
    </template>
  </vxe-grid>
</template>

<script>

// 分页默认配置
const GET_PAGERCONFIG = function() {
  return {
    total: 0, // 总条数
    currentPage: 1, // 当前页
    pageSize: 10, // 当前页码
    pageSizes: [10, 20, 50, 100], // 页面展示条数选择范围
    pagerCount: 5,
    layouts: ['Total', 'PrevPage', 'JumpNumber', 'NextPage', 'Sizes', 'FullJump']// 分页器配置
  }
}
// 空状态默认配置
const GET_EMPTYCONFIG = function () {
  return {
    text: '暂无数据', // 提示标题
    description: '', // 补充提示
    color: '' // 提示字体颜色
  }
}

// 表格默认配置
const GET_GRIDOPTIONS = function() {
 return {
    data: undefined, // 表格数据
    loading: false, // 加载状态
    resizable: true, // 可拖动调整列
    autoResize: true, // 自动响应大小
    stripe: true, // 斑马纹
    showHeaderOverflow: true, // 表格列头内容超出隐藏
    showOverflow: true, // 表格内容超出隐藏
    class: 'sense-table', // 表格类名
    headerCellClassName: 'sense-table-header-cell', // 表格表头单元格类名
    headerRowClassName: 'sense-table-header-row', // 表格表头行类名
    cellClassName: 'sense-table-cell', // 表格单元格类名
    rowClassName: 'sense-table-row', // 表格行类名
    border: 'none', // 边框线 true | none
    // 排序配置
    sortConfig: {
      trigger: 'cell', // 点击区域
      remote: true // 是否远程
    }
  }
}

export default {
  name: 'SenseTable',
  props: {
    // 获取数据的API方法
    api: {
      type: Function,
      default: undefined
    },
    // 传入API后，是否自动加载数据
    autoLoad: {
      type: Boolean,
      default: true
    },
    // 获取数据的查询参数
    filters: {
      type: Object,
      default: () => {}
    },
    // 是否隐藏分页器
    hidePager: {
      type: Boolean,
      default: false
    },
    // 少于最小页面展示条数时，自动隐藏分页器
    autoHidePager: {
      type: Boolean,
      default: false
    },
    // 分页器配置
    pagerConfig: {
      type: Object,
      default: ()=> {}
    },
    // 空数据配置
    emptyConfig: {
      type: Object,
      default: ()=> {
        return GET_EMPTYCONFIG()
      }
    }
  },
  data() {
    return {
      // 表格默认配置项
      gridOptions: GET_GRIDOPTIONS(),
      // 生效的分页配置
      effectPager: null,
    }
  },
  watch:{
    // 监听pagerConfig，更新effectPager配置
    pagerConfig: {
      handler(val) {
        this.effectPager = { ...GET_PAGERCONFIG(), ...val }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    // 是否展示分页
    showPager() {
      return this.hidePager ? false : (this.autoHidePager ? this.effectPager.total > this.effectPager.pageSizes[0] : true)
    },
    // 是否api模式
    hasAPI() {
      return !!this.api
    },
    // 是否加载中
    isLoading() {
      return _.isNil(this.$attrs.loading) ? this.gridOptions.loading : this.$attrs.loading
    }
  },
  created() {
    // 如果传入了api，并且配置为自动加载数据，组件内获取数据&分页
    if (this.hasAPI && this.autoLoad) {
      this.getList()
    }
  },
  methods: {
    /**
     * @description: 根据查询条件重新获取数据
     */
    search() {
      this.effectPager.currentPage = 1
      this.getList()
    },
    /**
     * @description: 获取数据
     */
    getList() {
      this.gridOptions.loading = true
      // 传入查询参数
      const params = _.cloneDeep(this.filters) || {}
      // 分页查询条件
      const { currentPage, pageSize } = this.effectPager
      params.page = currentPage
      params.pageSize = pageSize
      this.api(params).then(res => {
        this.gridOptions.data = res.data?.content?.list
        this.effectPager.total = res.data?.content?.total
      }).finally(() => {
        this.gridOptions.loading = false
      })
    },
    /**
     * @description: 分页改变事件
     * @param {object} e 分页参数 { currentPage, pageSize }
     */
    handlePageChange(e) {
      // 如果传入了API，获取分页数据
      if (this.hasAPI) {
        this.effectPager.currentPage = e.currentPage
        this.effectPager.pageSize = e.pageSize
        this.getList()
      } else {
        // 未传入API，返回分页参数
        this.$emit('page-change', e)
        return
      }
    }
  }
}
</script>
