import Vue from 'vue'
import App from './App'
import './css/app.css'
import store from './store';
import '../static/weui/weui.css'
// import 'mp-weui/lib/style.css'
// import WeUI from 'mp-weui/packages';
Vue.config.productionTip = false;
App.mpType = 'app';

import { goToPage } from './utils/config'

// 把通用方法挂载到Vue原型上
Vue.prototype.$goToPage = goToPage
Vue.prototype.$store = store;


// Vue.use(WeUI);

const app = new Vue({
  App
})
app.$mount();
