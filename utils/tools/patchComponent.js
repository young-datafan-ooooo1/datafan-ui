/*
 * @Author: Jelly L
 * @LastEditors: Jelly L
 * 修改antd默认配置
 */

/**
 * @description: 
 * @param {Object.} 
 */
export const patchComponent = (VueInstance,options) => {
    // 自动高度
    if(!options?.exclude?.includes('a-modal-auto-height')){
      VueInstance.$options._base._installedPlugins.map(component => {
        if(component.name === 'AModal'){
          component.props.bodyStyle.default = ()=>{return {maxHeight:'70vh',overflow: 'auto'}}
          component.props.centered.default = true
        }
      })
    }
  
    // 不可点击关闭
    VueInstance.$options._base._installedPlugins.map(component => {
        component.name === 'AModal' && (component.props.maskClosable.default = false)
      })

    VueInstance.$notification.config({
      duration: 2
    })
    VueInstance.$message.config({
      duration: 2
    })

    
}