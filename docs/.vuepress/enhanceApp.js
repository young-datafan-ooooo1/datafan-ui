
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import components from '../../components/index'
import 'xe-utils'
import VXETable from 'vxe-table'
import '../../assets/commonCss.less'
import '../../assets/page-table.scss'


export default async ({
  Vue
}) => {
  if (typeof process === 'undefined') {
    Vue.use(Antd)
    Vue.use(VXETable)
    Vue.use(components)
  }
}
