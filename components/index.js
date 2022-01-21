import SenseTable from './sense-table/index.vue'
import Empty from './empty/index.vue'
import { PageTitle, PageHandle, PageHandleItem } from './page-table'
import { matchPermission } from '../utils/match-permission'

function install(Vue) {
  if (install.installed) return
  install.installed = true

  Vue.component('STable', STable)
  Vue.component('SenseTable', SenseTable)
  Vue.component('Empty', Empty)
  Vue.component('SPageTitle', PageTitle)
  Vue.component('SPageHandle', PageHandle)
  Vue.component('SPageHandleItem', PageHandleItem)

  Vue.directive('permission', (el, binding, vnode) => {
    if (binding.value && !matchPermission(binding.value)) {
      const commentElm = document.createComment(binding.value)
      Object.defineProperty(commentElm, 'setAttribute', {
        value: () => undefined
      })
      vnode.elm = commentElm
      vnode.isComment = true
      vnode.context = undefined
      vnode.tag = undefined
      vnode.data.directives = undefined
      if (vnode.componentInstance) {
        vnode.componentInstance.$el = commentElm
      }
      if (el.parentNode) {
        el.parentNode.replaceChild(commentElm, el)
      }
    }
  })

  Vue.directive('permission-readonly', (el, binding) => {
    if (binding.value && !matchPermission(binding.value)) {
      el.style.pointerEvents = 'none'
    }
  })
}

const Plugins = {
  install: install
}

export default Plugins
