/* es6-shim,es6-promise ie兼容需要 */
import 'es6-shim'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import directives from './directives'
import moment from 'moment'
import iView from 'iview'
import echarts from 'echarts'
// 自定义方法及变量
import GLOBAL from './global/global'
import DATAS from './global/datas'
// axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
require('es6-promise').polyfill()
Vue.prototype.$echarts = echarts
Vue.prototype.GLOBALS = GLOBAL
Vue.prototype.DATAS = DATAS
Vue.prototype.echartsColorList = [
  '#4f7acb',
  '#ff9019',
  '#5b9bd5',
  '#ffc000',
  '#ff6666',
  '#1bb3f3',
  '#29cb97',
  '#ca65ff'
]
Vue.config.productionTip = false
Vue.use(iView)
Vue.use(directives)
Vue.filter('dateformat', (input, formatString = 'YYYY-MM-DD HH:mm:ss') => {
  /**
  * moment(input) 把时间字符串转成时间对象
  * format(formatString) 把时间对象，按照指定格式，格式化成符合条件的字符串
  */
  return moment(input).format(formatString)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
