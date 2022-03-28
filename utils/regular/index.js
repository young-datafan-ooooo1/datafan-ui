/*
 * @Description: 正则验证
 * @Date: 2021-08-17 14:39:34
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
        const tips = rule.message || '请输入英文、数字、下划'
        validate(reg, value, callback, tips)
    },
    /**
     * @description: 以英文开头，只包含英文、数字、下划线
     * @param {*} rule
     * @param {*} value
     * @param {*} callback
     */
    regEngStarNumLine(rule, value, callback) {
        const reg = /^[a-zA-Z][a-zA-Z0-9_]*$/.test(value) || !value
        const tips = rule.message || '以英文开始，可包含英文、数字、下划'
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
    regIsNumber(rule, value, callback) {
        const reg = /^[+]{0,1}(\d+)$/.test(value) || !value
        const tips = rule.message || '请输入正整数'
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
        const reg = (new RegExp('^.{' + min + ',' + max + '}$')).test(value) || !value
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
        const reg = !(new RegExp(
            "[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
        )).test(value) || !value
        const tips = rule.message || `不能包含特殊字符`
        validate(reg, value, callback, tips)
    }
}

export default rules