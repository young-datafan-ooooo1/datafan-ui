<!--
 * @Description: 穿梭弹窗组件（共享用户、授权用户等，需要在多个可选项中进行多选时的场景）
 * @Date: 2021-03-01 10:05:26
 * @LastEditTime: 2023-10-09 15:21:12
-->
<template>
  <a-modal 
    v-model="isShowModal"
    :width="width"
    :title="title"
    :mask-closable="maskClosable"
    :destroyOnClose="destroyOnClose"
    :confirm-loading="isConfirmLoading"
    @ok="onConfirm"
    @cancel="onCancel"
  >
    <a-spin :spinning="isLoading">
      <a-transfer
        class="transfer"
        show-search
        :target-keys="targetKeys"
        :data-source="dataSource"
        :filter-option="filterOption"
        :list-style="listStyle"
        :render="render"
        :titles="titles"
        @change="onTransferChange"
        v-bind="$attrs"
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
      </a-transfer>
    </a-spin>
  </a-modal>
</template>

<script>

export default {
  name: 'TransferModal',
  model: {
    prop: 'visible',
    event: 'input'
  },
  props: {
    // 弹窗名称
    title: {
      type: String,
      default: '授权'
    },
    // 弹窗宽度
    width: {
      type: String,
      default: 'fit-content'
    },
    // 全部数据 [{ key: string, title: string }]
    allData: {
      type: Array,
      default: () => []
    },
    // 右侧已选择数据 string[]
    keyData: {
      type: Array,
      default: () => []
    }, 
    // 列表loading状态
    loading: {
      type: Boolean,
      default: () => false
    },
    // 提交loading状态
    confirmLoading: {
      type: Boolean,
      default: () => false
    },
    // 标题集合，顺序从左至右
    titles: {
      type: Array,
      default: () => ['未授权用户列表', '已授权用户列表']
    },
    // 每行数据渲染函数，该函数的入参为 dataSource 中的项，返回值为 element。或者返回一个普通对象，其中 label 字段为 element，value 字段为 title
    render: {
      type: Function,
      default: item => item.title
    },
    // 穿梭框的listStyle
    listStyle: {
      type: Object,
      default: ()=> {
        return { width: '280px', height: '350px' }
      }
    },
    // modal显示隐藏
    visible: {
      type: Boolean,
      default: false
    },
    // 点击遮罩层是否可以关闭
    maskClosable: {
      type: Boolean,
      default: false
    },
    // 关闭时销毁 Modal 里的子元素
    destroyOnClose: {
      type: Boolean,
      default: true
    },
  },
  data () {
    return {
      isShowModal: false, // 是否显示modal
      isConfirmLoading: this.confirmLoading, // 提交按钮loading
      isLoading: this.loading, // 是否加载中
      dataSource: this.allData, // 数据源，其中的数据将会被渲染到左边一栏中，targetKeys 中指定的除外
      targetKeys: this.keyData, // 显示在右侧框数据的 key 集合
    }
  },
  watch: {
    // 监听显示隐藏
    visible (val) {
      this.isShowModal = val
      if(val) {
        this.dataSource = _.cloneDeep(this.allData)
        this.targetKeys = _.cloneDeep(this.keyData)
      }
    },
    // 监听全部数据
    allData (val) {
      this.dataSource = _.cloneDeep(val)
    },
    // 监听右侧已选择数据
    keyData (val) {
      this.targetKeys = _.cloneDeep(val)
    },
    // 监听列表loading
    loading (val) {
      this.isLoading = val
    },
    // 监听提交loading
    confirmLoading (val) {
      this.isConfirmLoading = val
    }
  },
  methods: {
    /**
     * @description: 筛选匹配项
     * @param {string} input 检索的输入项
     * @param {object} option 目标对比项
     * @return {boolean} 符合筛选条件时，返回true
     */
    filterOption (input, option) {
      return option.title.toLowerCase().includes(input.toLowerCase())
    },
    
    /**
     * @description: 穿梭框改变事件
     * @param {Array} targetKeys 选中目标的key
     */
    onTransferChange (targetKeys, direction, moveKeys) {
      this.targetKeys = targetKeys
    },

    /**
     * @description: 提交事件
    */
    onConfirm () {
      this.$emit('ok', this.targetKeys)
    },
    
    /**
     * @description: 弹层关闭
     */
    onCancel () {
      this.$emit('input')
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
.transfer {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>