
import Antd from 'ant-design-vue'
// 引用本地组件&样式库
// import components from '../../components/index'
// import '../../assets/style/index.less'

// 引用npm包组件&样式库
import DataFanUI from '../../components/index.js'
import '../../assets/style/index.less'
import _ from 'lodash'

export default async ({
  Vue
}) => {
  Vue.prototype._ = _
    Vue.use(Antd)
    // Vue.use(components)
    Vue.use(DataFanUI)
}
