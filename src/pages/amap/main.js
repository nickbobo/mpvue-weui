import Vue from 'vue'
import App from './index'
// 引入vue-amap
// import VueAMap from 'vue-amap';
// Vue.use(VueAMap);
// console.info(VueAMap)
 
// 初始化vue-amap

// VueAMap.initAMapApiLoader({
//   // 高德的key
//   key: 'b9d1075d56cfc2c780a4edffb02214c2',
//   // 插件集合
//   //plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   // 高德 sdk 版本，默认为 1.4.4
//   v: '1.4.4'
// });

// const script = document.createElement('script');
// script.type = 'text/javascript';
// script.async = true;
// script.defer = true;
// script.src = "https://apis.map.qq.com/tools/geolocation?key=b9d1075d56cfc2c780a4edffb02214c2&v=1.4.4&plugin=AMap.Autocomplete,AMap.PlaceSearch,AMap.Scale,AMap.OverView,AMap.ToolBar,AMap.MapType,AMap.PolyEditor,AMap.CircleEditor,AMap.Autocomplete,AMap.PlaceSearch,AMap.PolyEditor,AMap.CircleEditor&callback=amapInitComponent";

// const UIPromise = this._config.uiVersion ? this.loadUIAMap() : null;

// this._scriptLoadingPromise = new Promise((resolve, reject) => {
//   this._window['amapInitComponent'] = () => {
//     while (this._queueEvents.length) {
//       this._queueEvents.pop().apply();
//     }
//     if (UIPromise) {
//       UIPromise.then(() => {
//         window.initAMapUI();
//         setTimeout(resolve);
//       });
//     } else {
//       return resolve();
//     }
//   };
//   script.onerror = error => reject(error);
// });
// document.head.appendChild(script);
const app = new Vue(App)
app.$mount()
