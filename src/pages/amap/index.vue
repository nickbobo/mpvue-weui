<template>
  <div class="page">
 <div class="map_container"></div>
 <web-view src="https://www.amap.com/"></web-view>
  </div>
</template>

<script>
//  var map = new AMap.Map('container', {
//     center:[117.000923,36.675807],
//     zoom:11
//   });
// import AMapWX from 'amap-wx'
import Vue from 'vue'
let amapFile = require('./amap-wx.js');
// import VueAMap from 'vue-amap';

var amap = new amapFile.AMapWX({ key: 'b9d1075d56cfc2c780a4edffb02214c2' });
console.info(amap)
 amap.getPoiAround({
      success: function(data){
        //成功回调
      },
      fail: function(info){
        //失败回调
        console.log(info)
      }
    })
// Vue.use(AMapWX);
// console.info(VueAMap)

// VueAMap.initAMapApiLoader({
//   // 高德的key
//   key: 'b9d1075d56cfc2c780a4edffb02214c2',
//   // 插件集合
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//   // 高德 sdk 版本，默认为 1.4.4
//   v: '1.4.4'
// });
export default {
onLoad(){

}
}
</script>

<style>

</style>
