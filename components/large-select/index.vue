<!--
 * @Description: 大数据量下拉组件（下拉数据分页处理）
 * @Date: 2022-03-02 18:23:42
 * @LastEditTime: 2022-03-07 15:46:25
-->

<template>
  <a-select 
    v-model="selectOption" 
    class="large-select" 
    dropdownClassName="dropdownClassName"
    allow-clear 
    show-search
    :loading="isLoading"
    :filter-option="false"
    @popupScroll="onPopupScroll"
    @search="onSearch"
    @blur="onBlur"
    @dropdownVisibleChange="onDropdownVisibleChange"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <a-select-option
      v-for="item in list"
      :key="item.value"
      :value="item.value"
    >
      {{ item.title }}
    </a-select-option>
  </a-select>
</template>

<script>

// 下拉框加载相关默认配置
const CONFIG = function () {
  return {
   
  }
}

export default {
  name: 'LargeSelect',  
  model: {
    prop: 'selectValue',
    event: 'change'
  },
  props: {
    // 选中项
    selectValue: {
      type: String | Number | Array,
      default: undefined
    },
    // 数据列表
    data: {
      type: Array,
      default: ()=> []
    },
    // 下拉框加载状态
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 下拉框加载相关默认配置
      config: {
        page: 1, // 当前页码
        pageSize: 100, // 每页展示条数
        maxPage: 0, // 总页数
        maxLength: 0, // 总条数
        startIndex: 0, // 当前展示的数据区间开始坐标
        endIndex: 0, // 当前展示的数据区间结束坐标
        nextOffset: 100, // 触发加载下一页scrollTop距离
      }, 
      originData: [], // 全部数据
      filterData: [], // 筛选后的数据
      searchText: '', // 筛选字符串
      isLoading: false, // 下拉框加载状态
      loaded: false // 加载状态（用于区分首次点开下拉框）
    }
  },
  computed: {
    // 选择项数据
    selectOption: {
      set(val) {
        this.$emit('change', val)
      },
      get() {
        // 选中项值如为空，返回undefined（返回空字符串会被当成value值）
        return this.selectValue || undefined
      }
    },
    // 计算下拉数据
    list() {
      // 如果源数据为空，直接返回空数组[]
      if(this.originData.length === 0) {
        return []
      }
      this.isLoading = true
      // 如果是首次进入，并且有选中项，计算出选中项所在页
      if(!this.loaded && this.selectOption) {
        this.findPageByValue(this.selectOption)
      }
      const originData = this.originData
      const { pageSize } = this.config
      let result = originData
      // 如有输入过滤字符串，在原数据上进行过滤
      if(this.searchText) {
        result = this.getFilterData(originData, this.searchText)
      }
      this.config.maxLength = result.length
      this.config.maxPage = Math.ceil(result.length / pageSize)
      const { startIndex, endIndex } = this.getSliceParams()
      this.config.startIndex = startIndex
      this.config.endIndex = endIndex
      this.isLoading = false
      return result.slice(startIndex, endIndex)
    },
    // 是否为多选模式
    isMultiple() {
      return this.$attrs.mode === 'multiple'
    }
  },
  watch: {
    // 更新获取源数据
    data(val) {
      this.isLoading = true
      // 区分单选/多选模式
      if(this.isMultiple) {
        const checkedItems = val.filter(item =>  this.selectOption.includes(item.value))
        this.originData = [...new Set([...checkedItems, ...val])]
      } else {
        this.originData = val
      }
    },
    // 更新获取加载状态
    loading(val) {
      this.isLoading = val
    }
  },
  methods: {
    onPopupScroll(e) {
      const { scrollHeight, scrollTop, clientHeight } = e.target
      const { nextOffset, page, pageSize, maxPage } = this.config
      // 滚动条已到底部，加载下一页数据
      if((scrollHeight - scrollTop ) <= (clientHeight + nextOffset)) {
        // 未到最后一页
        if(page < maxPage - 1) {
          this.config.page += 1
          // 对比上次坐标，判断相差数量设置scrollTop
          const { endIndex } = this.getSliceParams()
          const scrollNum = endIndex - this.config.endIndex
          if(scrollNum === pageSize) {
            e.target.scrollTop = scrollNum * scrollHeight / this.list.length - clientHeight
          } else {
            e.target.scrollTop = scrollTop - scrollNum * scrollHeight / this.list.length
          }
        } 
      }
      // 滚动条已到顶部，加载上一页数据
      else if(scrollTop <= 0) {
        // 如果已经是第一页数据
        if(page > 1) {
          this.config.page -= 1
          // 对比上次坐标，判断相差数量设置scrollTop
          const { startIndex } = this.getSliceParams()
          e.target.scrollTop = (this.config.startIndex - startIndex) * scrollHeight / this.list.length
        }
      }
    },
    /**
     * @description: 获取筛选后的数据
     * @param {array} data
     * @param {string} value
     * @return {array} 
     */    
    getFilterData(data, value) {
      return data.filter(item => item.title.toLowerCase().includes(value.toLowerCase()))
    },
    /**
     * @description: 获取需切割的区域下标
     * @return {{start: number, end: number}} 开始下标、结束下标
     */    
    getSliceParams() {
      const { page, pageSize, maxPage, maxLength } = this.config
      const gap = 1 // todo 1.5时回显才可以解决如101在第一条数据的问题，但要相应调整滚动条
      // 计算当前所在页数据区间下标（为了滚动的流畅性及滚动条位置，始终加载上{gap}页数据、当前页数据、下{gap}页数据）
      let startIndex = ((page - gap) < 0 ? 0 : (page - gap))* pageSize 
      let endIndex = (page + gap) * pageSize 
      // 如果下一页的数据已经超过总长度
      if(endIndex >= maxLength) {
        endIndex = maxLength
        // 往前推2个gap，最少为0
        startIndex = maxLength - pageSize * gap * 2 > 0 ? maxLength - pageSize * gap * 2 : 0
      }
      return { startIndex, endIndex }
    },
    /**
     * @description: 根据value查询所在页
     * @param {string} value
     * @return {number}
     */    
    findPageByValue(value) {
      const val = this.isMultiple ? value[0] : value
      if(val && this.originData.length > 0) {
        const findIndex = this.originData.findIndex(item => item.value === val)
        if (findIndex >= 0) {
          this.config.page = Math.ceil((findIndex + 1)/this.config.pageSize)
        }
      }
    },
    /**
     * @description: 文本框值变化时回调
     * @param {string} 输入的文本值
     */    
    onSearch(value) {
      this.config.page = 1
      this.searchText = value
    },
    /**
     * @description: 展开下拉菜单的回调
     * @param {boolean} open 是否打开状态
     */    
    onDropdownVisibleChange(open) {
      if (!open) {
        return
      }
      this.loaded = true
      // 如果选择项为空，回到第一页数据
      if(!this.selectOption) {
        this.config.page = 1
      } else {
       this.findPageByValue(this.selectOption)
      }
    },
    /**
     * @description: 失去焦点时，按最新的value设置list数据
     * @param {string} value
     */    
    onBlur(value) {
      this.findPageByValue(value)
    }
  }
}
</script>
