/*
 * @Description: 权限匹配（检查按钮/控件权限）
 * @Date: 2022-01-17 17:48:35
 * @LastEditTime: 2022-01-17 18:06:09
 */

/**
 * @description: 权限匹配
 * @param {string|string[]} value 要检索的字符串或字符串数组
 * @return {boolean} 是否匹配权限（多个条件时，任意一个匹配成功即为true）
 */
export function matchPermission(value) {
  let list = window.$store.getters['components/button']
  // 按钮权限组为空，直接返回false（无权限）
  if (!list || list.length === 0) {
    return false
  }
  // String类型：直接判断返回是否存在
  if (typeof value === 'string') {
    return list.includes(value)
  }
  // Array类型：循环key数组，存在一个即返回
  if (value instanceof Array) {
    let hasPermission = false
    for (const item of value) {
      if (list.includes(item)) {
        hasPermission = true
        break
      }
    }
    return hasPermission
  }
}
