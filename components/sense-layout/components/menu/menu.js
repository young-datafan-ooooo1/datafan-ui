
 import Menu from 'ant-design-vue/es/menu'
 import fastEqual from 'fast-deep-equal'
 
 const { Item, SubMenu } = Menu
 
 export default {
   name: 'IMenu',
   props: {
     options: {
       type: Array,
       required: true
     },
     allOpenKeys: {
       type: Array,
       require: true
     },
     theme: {
       type: String,
       required: false,
       default: 'dark'
     },
     mode: {
       type: String,
       required: false,
       default: 'inline'
     },
     collapsed: {
       type: Boolean,
       required: false,
       default: false
     },
     i18n: Object,
     openKeys: Array
   },
   data() {
     return {
       selectedKeys: [],
       sOpenKeys: [],
       cachedOpenKeys: []
     }
   },
   computed: {
     menuTheme() {
       return this.theme === 'light' ? this.theme : 'dark'
     }
   },
   created() {
     this.updateMenu()
     if (this.options.length > 0 && !this.options[0].fullPath) {
       this.formatOptions(this.options, '')
     }
     // 自定义国际化配置
     if (this.i18n && this.i18n.messages) {
       const messages = this.i18n.messages
       Object.keys(messages).forEach(key => {
         this.$i18n.mergeLocaleMessage(key, messages[key])
       })
     }
   },
   watch: {
     options(val) {
       if (val.length > 0 && !val[0].fullPath) {
         this.formatOptions(this.options, '')
       }
     },
     i18n(val) {
       if (val && val.messages) {
         const messages = this.i18n.messages
         Object.keys(messages).forEach(key => {
           this.$i18n.mergeLocaleMessage(key, messages[key])
         })
       }
     },
     collapsed(val) {
       if (val) {
         this.cachedOpenKeys = this.sOpenKeys
         this.sOpenKeys = []
       } else {
         this.sOpenKeys = this.cachedOpenKeys
       }
     },
     '$route': function() {
       this.updateMenu()
     },
     sOpenKeys(val) {
       this.$emit('openChange', val)
       this.$emit('update:openKeys', val)
     }
   },
   methods: {
     renderIcon: function(h, icon, key) {
       if (this.$scopedSlots.icon && icon && icon !== 'none') {
         const vnodes = this.$scopedSlots.icon({ icon, key })
         vnodes.forEach(vnode => {
           vnode.data.class = vnode.data.class ? vnode.data.class : []
           vnode.data.class.push('anticon')
         })
         return vnodes
       }
       return !icon || icon === 'none' ? null : h('i', { class: ['senses-icons ', icon], attrs: { style: 'margin-right:10px' }})
     },
     renderMenuItem: function(h, menu) {
       let tag = 'router-link'
       let config = { props: { to: menu.fullPath }, attrs: { style: 'overflow:hidden;white-space:normal;text-overflow:clip;' }}
       if (menu.meta && menu.meta.link) {
         tag = 'a'
         config = { attrs: { style: 'overflow:hidden;white-space:normal;text-overflow:clip;position:relative', href: menu.meta.link, target: '_blank' }}
       }
       const iconTag = menu.icon ? 'i' : 'span'
       const iconClass = menu.icon ? ['senses-icons ', `senses-icons-${menu.icon}`] : 'dotted'
       const iconStyle = menu.icon ? { style: 'margin-right:10px' } : { style: 'vertical-align: middle' }
       return h(
         Item, { key: menu.fullPath },
         [
           h(tag, config,
             [
               h(iconTag, {
                 class: iconClass,
                 attrs: iconStyle,
                 on: {
                   'update:openKeys': (val) => {
                     this.sOpenKeys = val
                   },
                   click: (obj) => {
                     obj.selectedKeys = [obj.key]
                     this.$emit('select', obj)
                   }
                 }
               }
               ),
               // this.$t(getI18nKey(menu.fullPath))
               menu.name
             ]
           )
         ]
       )
     },
     renderSubMenu: function(h, menu) {
       const this_ = this
       const subItem = [h('span', { slot: 'title', attrs: { style: 'overflow:hidden;white-space:normal;text-overflow:clip;' }},
         [
           this.renderIcon(h, `senses-icons-${menu.icon}`, menu.fullPath),
           // this.$t(getI18nKey(menu.fullPath))
           menu.name
         ]
       )]
       const itemArr = []
       menu.children.forEach(function(item) {
         itemArr.push(this_.renderItem(h, item))
       })
       return h(SubMenu, { key: menu.fullPath },
         subItem.concat(itemArr)
       )
     },
     renderItem: function(h, menu) {
       if (!menu.invisible) {
         let renderChildren = false
         const children = menu.children
         if (children !== undefined) {
           for (let i = 0; i < children.length; i++) {
             const childMeta = children[i].meta
             if (!childMeta || !childMeta.invisible) {
               renderChildren = true
               break
             }
           }
         }
         return (menu.children && renderChildren) ? this.renderSubMenu(h, menu) : this.renderMenuItem(h, menu)
       }
     },
     renderMenu: function(h, menuTree) {
       const this_ = this
       const menuArr = []
       menuTree.forEach(function(menu, i) {
         menuArr.push(this_.renderItem(h, menu, '0', i))
       })
       return menuArr
     },
     formatOptions(options, parentPath) {
       options.forEach(route => {
         const isFullPath = route.path.substring(0, 1) === '/'
         route.fullPath = isFullPath ? route.path : parentPath + '/' + route.path
         if (route.children) {
           this.formatOptions(route.children, route.fullPath)
         }
       })
     },
     updateMenu() {
       const matchedRoutes = this.$route.matched.filter(item => item.path !== '')
       this.selectedKeys = this.getSelectedKey(this.$route)
       let openKeys = matchedRoutes.map(item => item.path)
       openKeys = openKeys.slice(0, openKeys.length - 1)
       if (!fastEqual(openKeys, this.sOpenKeys)) {
         this.collapsed || this.mode === 'horizontal' ? this.cachedOpenKeys = openKeys : this.sOpenKeys = openKeys
       }
     },
     getSelectedKey(route) {
       return route.matched.map(item => item.path)
     },
     resetBgColor(obj) {
       if (obj.keyPath.length > 1) {
         obj.item.$el.style.background = 'none'
       }
     }
   },
   render(h) {
     return h(
       Menu,
       {
         props: {
           theme: this.menuTheme,
           mode: this.$props.mode,
           selectedKeys: this.selectedKeys,
           defaultOpenKeys: this.openKeys ? this.openKeys : this.sOpenKeys
         },
         on: {
           'update:openKeys': (val) => {
             this.sOpenKeys = val
           },
           click: (obj) => {
             obj.selectedKeys = [obj.key]
             this.resetBgColor(obj)
             this.$emit('select', obj)
           }
         }
       }, this.renderMenu(h, this.options)
     )
   }
 }
 