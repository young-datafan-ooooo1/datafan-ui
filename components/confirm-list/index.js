/*
 * @Description: 批量确认弹窗（批量导出/下载/删除等）
 * @Date: 2022-03-09 11:25:58
 * @LastEditTime: 2022-03-14 15:34:10
 */

export default {
  install(Vue) {
    /**
     * @description: 批量确认弹窗
     * @param {Object} options 参数对象 ModalOptions
     */    
    Vue.prototype.$confirmList = function (options) {
      const h = this.$createElement
      this.$confirm(getConfirmParams(h, options))
    }
  }
}

/**
 * @description: 填充content属性，返回参数对象
 * @param {Object} h createElement
 * @param {Object} options 参数对象，参考ant官网ModalOptions
 * @return {Object} 更新options.content后的参数对象
 */    
 function getConfirmParams(h, options) {
  options.content = Array.isArray(options.content) ? options.content : [options.content]
  Object.assign(options, {
    content: h('ul', 
      {
        style: {
          margin: 0,
          paddingLeft: '20px',
          maxHeight: '30vh',
          overflow: 'auto'
        }
      },
      options.content.map(item => h('li', {
        style: {
          margin: 0,
          color: 'rgba(0,0,0,.65)'
        }
      }, item))
    )
  })
  return options
}