/*
 * @Description: 全局loading组件
 * @使用方式: 
 * 1. 打开loading提示: this.$loading('加载中...') 
 * 2. 关闭loading: this.$loading.close()
 * @Date: 2022-03-07 17:50:38
*/
import FullLoading from './full-loading'

let LOADING = {
  component: null,  // Object loading组件实例
}
export default {
  install(Vue) {
    /**
     * @description: loading方法（打开、关闭）
     * @param {String} tip 提示文字
     * @param {String} type 操作类型 [open、close]
     */   
    Vue.prototype.$loading = function(tip, type) {
      // 关闭loading
      if (type === 'close' && LOADING.component) {
        LOADING.component.show = false
      } else {
        // 未注册组件，注册并挂载组件
        if(!LOADING.component) {
          let LoadingConstructor = Vue.extend(FullLoading)
          // 创建一个该子类的实例，并挂载到一个元素上
          LOADING.component = new LoadingConstructor().$mount()
          document.body.appendChild(LOADING.component.$el)
        }
        // 已注册组件，展示loading
        LOADING.component.tip = tip
        LOADING.component.show = true
      }
    }
    // 挂载打开&关闭方法
    const types = ['open', 'close']
    types.forEach(type => {
      Vue.prototype.$loading[type] = function(tip) {
        return Vue.prototype.$loading(tip, type)
      }
    })
  }
}
