import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

export default async ({
  Vue
}) => {
  if (typeof process === 'undefined') {
    Vue.use(Antd)
  }
}
