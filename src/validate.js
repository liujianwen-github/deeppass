import Vue from 'vue'
import VeeValidate, {Validator} from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'
Validator.addLocale(zh) // 配置语言为中文
const config = {
  locale: 'zh_CN'
}
Vue.use(VeeValidate, config)
const dictionary = {
  zh_CN: {
    messages: {
      // 自定义不符合验证条件时的提示信息
      required: (field) => '请输入' + field
    },
    attributes: {
      // 定义需要验证条件的中文名（filed），不定义话会出现如 name是必须 的这种提示
      email: '邮箱',
      password: '密码',
      name: '姓名',
      phone: '手机',
      cardId: '卡号',
      leaveMessage: '留言',
      birthday: '生日',
      isVip: 'VIP'
    }
  }
}
Validator.updateDictionary(dictionary) // 更新配置

// 验证规则
// 姓名
const isName = {
  messages: {
    zh_CN: (field, args) => field + '不能少于两位'
  },
  validate: (value, args) => {
    return value.length >= 2
    // 自定义规则中必须有validate方法，或者直接定义isName为函数
  }
}
// 卡号
const isCard = {
  messages: {
    zh_CN: (field, args) => field + '不能多于15位'
  },
  validate: (value, args) => {
    return value.length <= 15
    // 自定义规则中必须有validate方法，或者直接定义isName为函数
  }
}
// 留言
const leaveMessage = {
  messages: {
    zh_CN: (field, args) => field + '不能多于20个字！'
  },
  validate: (value, args) => {
    return value.length <= 20
    // 自定义规则中必须有validate方法，或者直接定义isName为函数
  }
}
const isVip = {
  messages: {
    zh_CN: (field, args) => '请选择是否为VIP用户'
  },
  validate: (value, args) => {
    console.log(value)
    return false
    // 自定义规则中必须有validate方法，或者直接定义isName为函数
  }
}
// 注册自定义规则
Validator.extend('name', isName)
Validator.extend('cardId', isCard)
Validator.extend('leaveMessage', leaveMessage)
Validator.extend('isVip', isVip)
