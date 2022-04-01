<!--
 * @Description: 公共名称/备注输入框组件
 * @Date: 2022-03-21 13:30:44
-->
<template>
  <a-input
    v-model="name"
    v-bind="$attrs"
    :type="type"
    v-on="$listeners"
  />
</template>
<script>
export default {
  name: 'DInputLengthlimit',
  model: {
    prop: 'value',
    event: 'input-value'
  },
  props: {
    // 输入的值
    value: {
      type: String,
      default: undefined
    },
    // 表单验证规则
    rules: {
      type: [Object, Array],
      default: null
    },
    // 表单规则设置位置 form||formItem
    ruleSetLocation: {
      type: String,
      default: 'form'
    },
    // 表单域 model 字段
    prop: {
      type: String,
      default: undefined
    },
    // 是否开启校验
    validate: {
      type: Boolean,
      default: true
    },
    // 最大长度
    max: {
      type: Number,
      default: undefined
    },
    // 最小长度
    min: {
      type: Number,
      default: undefined
    },
    // 提示语
    message:{
      type: String,
      default: undefined
    },
    // 声明 input 类型
    type: {
      type: String,
      default: undefined
    }
  },
  data() {
    return {}
  },
  computed: {
    name: {
      set(newValue) {
        this.$emit('input-value', newValue)
      },
      get() {
        return this.value || undefined
      }
    },
    maxLength: {
      get() {
        const num = this.type === 'textarea' ? 200 : 50
        return this.max || num
      }
    },
    minLength: {
      get() {
        const num = this.type === 'textarea' ? 0 : 1
        return this.min || num
      }
    }
  },
  watch: {
    validate: {
      handler(newName, oldName) {
        if (newName) {
          let obj = this.rules
          const rule = { validator: this.regLength, min: this.minLength, max: this.maxLength, trigger: 'blur',message:this.message }
          if (!this.rules) {
            console.error('sense-name-input组建校验字符长度必须双向绑定rules')
            return
          }
          if (this.ruleSetLocation === 'form') {
            if (!this.prop) {
              console.error('sense-name-input组建校验字符长度必须传入prop属性')
              return
            }
            if (this.rules[this.prop]) {
              if (Array.isArray(this.rules[this.prop])) {
                obj[this.prop] = [...this.rules[this.prop], rule]
              } else {
                obj[this.prop] = [this.rules[this.prop], rule]
              }
            } else {
              obj[this.prop] = rule
            }
          }
          if (this.ruleSetLocation === 'formItem') {
            if (Array.isArray(this.rules)) {
              obj = [...this.rules, rule]
            } else if (Object.keys(this.rules).length === 0) {
              obj = rule
            } else {
              obj = [this.rules, rule]
            }
          }
          this.$emit('update:rules', obj)
        }
      },
      immediate: true
    }
  },
  methods: {
    regLength(rule, value, callback) {
      const min = rule.min || 0
      const max = rule.max || 50
      let reg=(new RegExp('^.{' + min + ',' + max + '}$')).test(value) 
      if(min>0){
        reg=value?true:false&&reg
      }
      const tips = rule.message || `长度在${min}~${max}个字符之间`
      if (reg) {
        callback()
      } else {
        callback(new Error(tips))
      }
    }
  }
}
</script>

