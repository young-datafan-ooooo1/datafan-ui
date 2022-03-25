/*
 * @Description: 组件/指令安装注册
 * @Date: 2022-03-01 15:14:22
 */
import Empty from './empty/index.vue'
import Resizable from './resizable'
import { PageTitle, PageHandle, PageHandleItem } from './page-table'
import Navigation from './navigation-slider'
import TransferModal from './transfer-modal'
import LargeSelect from './large-select'
import FullLoading from './full-loading'
import confirmList from './confirm-list'
import InputLengthlimit from './input-lengthlimit'

export { default as watermark } from './watermark'


function install(Vue) {
  if (install.installed) return
  install.installed = true

  Vue.use(FullLoading)
  Vue.use(confirmList)
  Vue.component('DEmpty', Empty)
  Vue.component('SPageTitle', PageTitle)
  Vue.component('SPageHandle', PageHandle)
  Vue.component('SPageHandleItem', PageHandleItem)
  Vue.component('SNavigation', Navigation)
  Vue.component('SResizable', Resizable)
  Vue.component('STransferModal', TransferModal)
  Vue.component('SLargeSelect', LargeSelect)
  Vue.component('SInputLengthlimit', InputLengthlimit)
}

const Plugins = { install }

export default Plugins
