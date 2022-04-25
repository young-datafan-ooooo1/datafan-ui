/*
 * @Description: 正则验证
 */
/**
 * @description: 统一校验
 * @param {RegExp} reg 校验结果
 * @param {string｜number} value 被校验的值
 * @param {Function} callback 回调函数
 * @param {string} tips 提示语
 */
export function validate(reg, value, callback, tips) {
  if (reg) {
    callback()
  } else {
    callback(new Error(tips))
  }
}
const rules = {
  /**
   * @description: 只包含英文、数字、下划线
   * @param {*} rule
   * @param {*} value
   * @param {*} callback
   */
  regEngNumLine(rule, value, callback) {
    const reg = /^[_a-zA-Z0-9]+$/.test(value) || !value
    const tips = rule.message || '请输入英文、数字、下划线'
    validate(reg, value, callback, tips)
  },
  /**
   * @description: 以英文开头，只包含英文、数字、下划线
   * @param {*} rule
   * @param {*} value
   * @param {*} callback
   */
  regEngStartNumLine(rule, value, callback) {
    const reg = /^[a-zA-Z][a-zA-Z0-9_]*$/.test(value) || !value
    const tips = rule.message || '以英文开始，可包含英文、数字、下划线'
    validate(reg, value, callback, tips)
  },
  /**
   * @description: 只能输入中文
   * @param {*} rule
   * @param {*} value
   * @param {*} callback
   */
  regIsChinese(rule, value, callback) {
    const reg = /^[\u4e00-\u9fa5]+$/.test(value) || !value
    const tips = rule.message || '请输入中文'
    validate(reg, value, callback, tips)
  },
  /**
   * @description: 只能输入英文
   * @param {*} rule
   * @param {*} value
   * @param {*} callback
   */
  regIsEnglish(rule, value, callback) {
    const reg = /^[a-zA-Z]+$/.test(value) || !value
    const tips = rule.message || '请输入英文'
    validate(reg, value, callback, tips)
  },
  /**
   * @description: 只能输入正整数
   * @param {*} rule
   * @param {*} value
   * @param {*} callback
   */
  regIsPositiveInteger(rule, value, callback) {
    const reg = /^[+]{0,1}(\d+)$/.test(value) || !value
    const tips = rule.message || '请输入正整数'
    validate(reg, value, callback, tips)
  },
  /**
   * @description: 只能输入数字,允许负数、小数
   * @param {*} rule
   * @param {*} value
   * @param {*} callback
   */
  regIsNumber(rule, value, callback) {
    const reg = /^\-?[0-9]+(.[0-9]+)?$/.test(value) || !value
    const tips = rule.message || '请输入数字'
    validate(reg, value, callback, tips)
  },
  /**
   * @description: 非零开头的正整数
   * @param {*} rule
   * @param {*} value
   * @param {*} callback
   */
  regNonZeroDigit(rule, value, callback) {
    const reg = /^(0|[1-9][0-9]*)$/.test(value) || !value
    const tips = rule.message || '请输入非零开头的正整数'
    validate(reg, value, callback, tips)
  },

  /**
   * @description: 校验字符长度,默认0-50
   * @param {*} rule
   * @param {*} value
   * @param {*} callback
   */
  regLength(rule, value, callback) {
    let min = rule.min || 0
    let max = rule.max || 50
    let reg = new RegExp('^.{' + min + ',' + max + '}$').test(value)
    if (min > 0) {
      reg = value && reg
    }
    const tips = rule.message || `长度在${min}~${max}个字符之间`
    validate(reg, value, callback, tips)
  },
  /**
   * @description: 校验名称长度,默认1-50
   * @param {*} rule
   * @param {*} value
   * @param {*} callback
   */
  regName(rule, value, callback) {
    let min = rule.min || 1
    let max = rule.max || 50
    let reg = new RegExp('^.{' + min + ',' + max + '}$').test(value)
    if (min > 0) {
      reg = value && reg
    }
    const tips = rule.message || `长度在${min}~${max}个字符之间`
    validate(reg, value, callback, tips)
  },
  /**
   * @description: 校验备注长度,默认0-200
   * @param {*} rule
   * @param {*} value
   * @param {*} callback
   */
  regDesc(rule, value, callback) {
    let min = rule.min || 0
    let max = rule.max || 200
    let reg = new RegExp('^.{' + min + ',' + max + '}$').test(value)
    if (min > 0) {
      reg = value && reg
    }
    const tips = rule.message || `长度在${min}~${max}个字符之间`
    validate(reg, value, callback, tips)
  },
  /**
   * @description: 不能包含特殊字符
   * @param {*} rule
   * @param {*} value
   * @param {*} callback
   */
  regSpecialCharacter(rule, value, callback) {
    const reg =
      !new RegExp(
        "[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
      ).test(value) || !value
    const tips = rule.message || `不能包含特殊字符`
    validate(reg, value, callback, tips)
  },
  /**
   * @description: 只支持输入英文、数字、_、-、/
   * @param {*} rule
   * @param {*} value
   * @param {*} callback
   */
  regEngNumSpecial(rule, value, callback) {
    const reg = /^[a-zA-Z0-9_\-\/]{1,}$/.test(value) || !value
    const tips = rule.message || `请输入英文、数字、_、-、/`
    validate(reg, value, callback, tips)
  },

  /**
   * @description: 只支持输入汉字、英文、数字、下划线，且只能以英文和汉字开头
   * @param {*} rule
   * @param {*} value
   * @param {*} callback
   */
  regChineseEngStartNumline(rule, value, callback) {
    const reg =
      /^[\u4E00-\u9FA5a-z][\u4E00-\u9FA5a-z0-9_]*$/.test(value) || !value
    const tips =
      rule.message || `请输入中文、英文、数字、下划线，且只能以英文和中文开头`
    validate(reg, value, callback, tips)
  },

  /**
   * @description: 校验是否是手机号码
   * @param {*} rule
   * @param {*} value
   * @param {*} callback
   */
  regIsPhoneNumber(rule, value, callback) {
    const reg =
      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
        value
      ) || !value
    const tips = rule.message || `请输入正确手机号码`
    validate(reg, value, callback, tips)
  },
}

export default rules
