/*
 * @Description: 组件/指令安装注册
 * @Date: 2022-03-01 15:14:22
 */
import Empty from './empty/index.vue'
import Resizable from './resizable'
import { PageTitle, PageHandle, PageHandleItem } from './page-table'
import { FiltersPopover, FiltersPopoverItem } from './filters-popover'
import { MorePopover, MorePopoverItem } from './more-popover'
import Navigation from './navigation-slider'
import TransferModal from './transfer-modal'
import LargeSelect from './large-select'
import FullLoading from './full-loading'
import confirmList from './confirm-list'
import InputLengthlimit from './input-lengthlimit'
import rules from '../utils/regular'
export { Resizable }


function install(Vue) {
  if (install.installed) return
  install.installed = true

  Vue.use(FullLoading)
  Vue.use(confirmList)
  Vue.component('DEmpty', Empty)
  Vue.component('DNavigation', Navigation)
  Vue.component('DResizable', Resizable)
  Vue.component('DPageTitle', PageTitle)
  Vue.component('DPageHandle', PageHandle)
  Vue.component('DPageHandleItem', PageHandleItem)
  Vue.component('DFiltersPopover', FiltersPopover)
  Vue.component('DFiltersPopoverItem', FiltersPopoverItem)
  Vue.component('DMorePopover', MorePopover)
  Vue.component('DMorePopoverItem', MorePopoverItem)
  Vue.component('DTransferModal', TransferModal)
  Vue.component('DLargeSelect', LargeSelect)
  Vue.component('DInputLengthlimit', InputLengthlimit)
  Vue.prototype.$rules = rules

}
const Plugins = { install }
export default Plugins
