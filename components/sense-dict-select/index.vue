<!--
 * @Description: 公共字典选择框组件
 * @Date: 2022-02-14 10:17:44
 * @LastEditTime: 2022-02-15 18:36:02
-->
<template>
  <a-select 
    v-model="selectOption" 
    class="dict-select" 
    allow-clear 
    :loading="isLoading" 
    @select="onSelect"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <a-select-option
      v-for="item in dictOptions"
      :key="item.dictCode"
      :value="item.dictCode"
    >
      {{ item.dictValue }}
    </a-select-option>
  </a-select>
</template>

<script>
import { PORTAL_MANAGEMENT } from '@sense70/common-component-vue'
import { request, METHOD } from '@sense70/common-component-vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'SenseDictSelect',  
  model: {
    prop: 'selectValue',
    event: 'change'
  },
  props: {
    // 选中项
    selectValue: {
      type: String,
      default: undefined
    },
    // 字典类型
    dictType: {
      type: String,
      default: undefined
    },
  },
  data() {
    return {
      dictOptions: [], // 字典数据
      isLoading: false // 是否加载中
    }
  },
  computed: {
    // store中获取dict缓存数据
    ...mapGetters('dicts', ['dictData']),
    // 选择项数据
    selectOption: {
      set(val) {
        this.$emit('change', val)
      },
      get() {
        // 选中项值如为空，返回undefined（返回空字符串会被当成value值）
        return this.selectValue || undefined
      }
    }
  },
  watch: {
    // 监听字典类型，更新获取
    dictType() {
      this.getData()
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    /**
     * @description: store中设置dict缓存数据的方法
     */
    ...mapMutations('dicts', ['setDictData']),
    /**
     * @description: 获取字典数据
     */
    getData() {
      // 字典键名参数是否存在
      if (!this.dictType) {
        return
      }
      // 获取store中当前字典是否存在
      const dictDataInStore = this.dictData && this.dictData[this.dictType]
      if (dictDataInStore) {
        this.dictOptions = dictDataInStore
        return
      }
      this.isLoading = true
      this.getDictByType({ dictType: this.dictType }).then(res => {
        const content = res?.data?.content || []
        this.dictOptions = content
        // 设置字典键名的store数据
        this.setDictData({ key: this.dictType, value: content })
        // 加载成功，数据回调
        this.$emit('load-success', content)
      }).finally(() => {
        this.isLoading = false
      })
    },
    /**
     * @description: 获取字典数据
     * @param {object} params 查询参数
     */
    getDictByType(params){
      return request(`${PORTAL_MANAGEMENT}/dict/query`, METHOD.GET, { params })
    },
    /**
     * @description: 选择框改变事件
     * @param {string} value 选中项value值
     */
    onSelect(value) {
      this.$emit('change', value)
    }
  }
}
</script>
