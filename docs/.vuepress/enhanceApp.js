
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import components from '../../components/index'
import '../../assets/commonCss.less'
// import '../../assets/page-table.scss'

export default async ({
  Vue
}) => {
  if (typeof process === 'undefined') {
    Vue.use(Antd)
    Vue.use(components)
  }
}
