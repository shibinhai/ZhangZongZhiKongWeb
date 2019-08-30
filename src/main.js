import Vue from 'vue'
import App from './App'
import {router} from './router'
import filters from './utils/filters'
import './font/iconfont.css'

import './common.scss'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import Http from './utils/http'
import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios'
// import moment from 'moment'// 导入文件
//
// Vue.prototype.$moment = moment// 赋值使用

// 定义一个全局过滤器实现日期格式化
// Vue.filter('datafmt', function (input, fmtstring) {
//   // 使用momentjs这个日期格式化类库实现日期的格式化功能
//   return moment(input).format(fmtstring)
// })

Vue.prototype.axios = axios
Vue.use(Http)
Vue.use(iView)
Vue.config.productionTip = false
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
