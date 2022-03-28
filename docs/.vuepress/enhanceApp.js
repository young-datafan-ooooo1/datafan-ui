
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import components from '../../components/index'
import '../../assets/style/index.less'
import _ from 'lodash'
// import '../../assets/page-table.scss'

export default async ({
  Vue
}) => {
  Vue.prototype._ = _
  if (typeof process === 'undefined') {
    Vue.use(Antd)
    Vue.use(components)
  }
}
