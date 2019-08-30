// import moment from 'moment' // 引入时间过滤

// 过滤器已全局配置，使用方法： {{ item.data | funtionName }} 如 : {{ item.pirce | countNumber }}

// 金额及数字格式化 例如： 1000.2 => 1,000.20  100000 => 100,000.00
exports.countNumber = (value) => {
  if (!value) return '0.00'
  var intPart = Number(value) | 0
  var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')

  var floatPart = '.00'
  var value2Array = String(value).split('.')

  if (value2Array.length === 2) {
    floatPart = value2Array[1].toString()

    if (floatPart.length === 1) {
      return intPartFormat + '.' + floatPart + '0'
    } else {
      return intPartFormat + '.' + floatPart
    }
  } else {
    return intPartFormat + floatPart
  }
}

// 状态码转换文字（适用于常用字段）
// exports.getStatus = status => {
//   switch (status) {
//     case 1:
//       return '已通过'
//     case 2:
//       return '待审核'
//     case 3:
//       return '已驳回'
//     default:
//       return '状态异常'
//   }
// }

// // 格式化时间
// exports.formatDate = (date, format) => {
//   return moment(new Date(date)).format(format)
// }
