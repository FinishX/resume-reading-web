// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'



// import '@/styles/index.scss' // global css
import '@/icons'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts'
import qs from 'Qs'
import axios from 'axios'
axios.defaults.withCredentials = true;

// axios.defaults.baseURL = '/api'
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.use(ElementUI, { locale })
Vue.use(VCharts)
Vue.config.productionTip = false

//设置cookie,放在main.js

Vue.prototype.setCookie = function(c_name,value,expiredays) {
  var exdate=new Date()
  exdate.setDate(exdate.getDate()+expiredays)
  document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
};


//获取cookie

Vue.prototype.getCookie=function(c_name) {
  if (document.cookie.length>0)
  {
    var  c_start=document.cookie.indexOf(c_name + "=")
    if (c_start!=-1)
    {
      c_start=c_start + c_name.length+1
     var c_end=document.cookie.indexOf(";",c_start)
      if (c_end==-1) c_end=document.cookie.length
      return unescape(document.cookie.substring(c_start,c_end))
    }
  }
  return ""
};





/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

