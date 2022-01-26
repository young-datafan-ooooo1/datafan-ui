/*
 * @Author: Jelly L
 * @LastEditors: Jelly L
 * @Description: 提供一个会随浏览器高度变化的值，使用mixin导入
 * @Date: 2021-08-21 17:05:01
 * @LastEditTime: 2021-08-21 17:10:54
 */

export default {
  data() {
    return {
      currentHeight: Math.max(window.innerHeight - 220, 200) // 当前高度，初始化数值：window.innerHeight - 200
    }
  },
  created() {
    window.addEventListener(
      'resize',
      () => (this.currentHeight = Math.max(window.innerHeight - 220, 200))
    )
  }
}
