<template>
  <div class="page" id ="page" :animation="animationData"  @bindtap="getCurrentCode">
        <div class="map_container"  >
          <map class="map" id="map" :longitude="longitude" :latitude="latitude" scale="10" :markers="markers" :polyline="polyline">
                <cover-view class="map_center">
                  <cover-view>
                    <cover-view class="map_order_number">订单号:112123232323</cover-view>
                    <cover-view class="map_waybill_state">已完成</cover-view>
                  </cover-view>
                  <cover-view class = "map_deliverer">
                    哈哈哈
                  </cover-view>
                  <cover-view class="map_cover_img">
                    <cover-image :src="imgPhone"></cover-image>
                  </cover-view>
                </cover-view>
            </map> 
        </div>
        <div class="time_axis_list" id="time_axis_list"  @touchmove = "listTouchMove" @touchend = "touchEnd" @touchstart = "touchStart">
            <div @click="onClickAnimation(0)" v-if="listShow" class="logistics_details"><img class="img_arrow" :src="imgArrow"></div> 

            <div class="message" v-for="(item,index) in timeAxis1" :key="index">
              <div class="circle">
                <span class="time">{{item.time}}</span>
                </div>
              <div class="lineborder">
                <img :src="imgIconYes" class="axis_icon_yes" alt="">
                <div class="message_content">
                    <div class="msg_start">已完成</div>
                    <div class="msg_content">【江苏工业园区54号】</div>
                </div>
              </div>
            </div>
          </div> 
  </div>


  
</template>

<script>
let amapFile = require("./amap-wx.js");
var amap = new amapFile.AMapWX({ key: "b9d1075d56cfc2c780a4edffb02214c2" });
export default {
  data() {
    return {
      animationData: "",
      animationData1: "",
      imgSrc: "../../static/images/icon_nav_my.png",
      imgArrow: "../../static/img/icon_xiaoxi_jiantou.png",
      imgPhone: "../../static/img/icon_dianhua.png",
      imgIconYes: "../../static/img/icon_wancheng.png",
      weather: "",
      latitude: "31.169717",
      longitude: "121.40712",
      textData: {},
      polyline: [],
      distance: "",
      cost: "",
      listShow: true,
      listShows: true,
      timeAxis1: [
        { time: "8-10", showTime: false },
        { time: "8-10", showTime: true },
        { time: "8-10", showTime: false },
        { time: "8-10", showTime: false },
        { time: "8-10", showTime: false }
      ],

      text: "",
      startY: 0,
      endY: 0,

      markers: [
        {
          iconPath: "../../static/img/mapicon_navi_s.png",
          id: 0,
          label: {
            content: "起始地",
            fontSize: 14,
            x: -20,
            y: -60,
            bgColor: "#ffffff",
            borderWidth: 1,
            borderColor: "#cccccc",
            padding: 4,
            textAlign: "center"
          },
          latitude: 31.169717,
          longitude: 121.40712,
          width: 23,
          height: 33
        },

        {
          iconPath: "../../static/img/marker.png",
          id: 1,
          label: {
            content: "经由站",
            fontSize: 14,
            x: -20,
            y: -60,
            bgColor: "#ffffff",
            borderWidth: 1,
            borderColor: "#cccccc",
            padding: 4,
            textAlign: "center"
          },
          latitude: 31.141333,
          longitude: 121.661735,
          width: 24,
          height: 34
        },

        {
          iconPath: "../../static/img/icon_zhongdian.png",
          id: 2,
          label: {
            content: "终点站",
            fontSize: 14,
            x: -20,
            y: -60,
            bgColor: "#ffffff",
            borderWidth: 1,
            borderColor: "#cccccc",
            padding: 4,
            textAlign: "center"
          },
          latitude: 30.897411,
          longitude: 121.940832,
          width: 24,
          height: 34
        }
      ],
      transits: []
    };
  },
  onLoad() {
    let that = this;
    amap.getDrivingRoute({
      origin: "121.40712,31.169717",
      waypoints: "121.661735,31.141333",
      destination: "121.940832,30.897411",
      success: function(data) {
        var points = [];
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          var steps = data.paths[0].steps;
          for (var i = 0; i < steps.length; i++) {
            var poLen = steps[i].polyline.split(";");
            for (var j = 0; j < poLen.length; j++) {
              points.push({
                longitude: parseFloat(poLen[j].split(",")[0]),
                latitude: parseFloat(poLen[j].split(",")[1])
              });
            }
          }
        }
        //连接线
        that.polyline = [{
            points: points,
            color: "#0091ff",
            width: 6
          }];
        if (data.paths[0] && data.paths[0].distance) {
          console.info(that.secToTime(data.paths[0].duration));
        }
      }
    });
  },
  methods: {
    onClickAnimation(start) {
      //创建动画
      var animation = wx.createAnimation({
        duration: 4000,
        timingFunction: "ease",
        delay: 0,
        transformOrigin: "50% 50%"
      });
      //设置动画
      // animation.rotate(90).step();     //旋转90度
      //animation.scale(1.5).step();        //放大1.5倍
      //animation.translate(-30,-50).step();        //偏移x,y,z
      // animation.skew(30,50).step();        //倾斜x,y
      //animation.rotate(45).scale(0.8).translate(10,10).step();     //边旋转边放大
      if (start == 0) {
        this.listShow = false;
        animation.top("-60vh").step({ duration: 100 });
      } else {
        animation.top("0").step({ duration: 100 });
      }

      //导出动画数据传递给组件的animation属性。
      this.animationData = animation.export();
    },

    touchStart(e) {
      // 获取移动距离，可以通过打印出e，然后分析e的值得出
      this.startY = e.mp.changedTouches[0].pageY;
    },
    // 滑动结束
    touchEnd(e, index) {
      // 获取移动距离
      this.endY = e.mp.changedTouches[0].pageY;
      if (this.endY - this.startY > 100) {
        this.onClickAnimation(1);
      }
      if (this.endY - this.startY < -10) {
        this.listShow = false;
      }

      let $this = this;
      var query = wx.createSelectorQuery();
      query.select("#page").boundingClientRect();
      query.selectViewport().scrollOffset();
      query.exec(function(res) {
        // res[0].top       // #the-id节点的上边界坐标
        // res[1].scrollTop // 显示区域的竖直滚动位置
        console.info("11--,", res[0].top);
        if (res[0].top >= 0) {
          $this.listShow = true;
        }
      });
      // var query1 = wx.createSelectorQuery();
      // query1.select("#time_axis_list").boundingClientRect();
      // query1.selectViewport().scrollOffset();
      // query1.exec(function(res) {
      //   // res[0].top       // #the-id节点的上边界坐标
      //   // res[1].scrollTop // 显示区域的竖直滚动位置
      //   console.info("22--,", res[0].top);
      //   // if (res[0].top >= 0) {
      //   // $this.listShow = true;
      //   // }
      // });
      // if (this.startX - this.endX > 10) {
      //   for (let i = 0; i < this.lists.length; i++) {
      //     this.lists[i].type = 0;
      //   }
      //   this.lists[index].type = 1;
      // } else if (this.startX - this.endX < -10) {
      //   for (let i = 0; i < this.lists.length; i++) {
      //     this.lists[i].type = 0;
      //   }
      // }
    },

    // listTouchSart(event) {
    //   // this.lastX = event.mp.touches[0].pageX;
    //   this.endY = event.mp.touches[0].pageY;
    // },
    listTouchMove(event) {
      // console.info(event.mp.touches[0].pageY);
      // let //currentX = event.mp.touches[0].pageX,
      // currentY = ,
      //tx = currentX - this.lastX,
      // ty = this.lastY-currentY ,
      // text = "";
      // if (Math.abs(tx) > Math.abs(ty)) {
      //   // console.info(ty,tx)
      // } else {
      //   if (ty < 0) text = "向上滑动";
      //   else if (ty < 0) text = "向下滑动";
      // }

      // this.text = text;
      // this.lastX = currentX;
      this.endY = event.mp.touches[0].pageY;
      if (this.endY - this.startY < -10) {
        // console.info(11111);
        this.listShow = false;
        // this.onClickAnimation(1);
      }

      // console.info(this.lastY);
    },
    // showIt(index) {
    //   this.timeAxis1[index].showTime = !this.timeAxis1[index].showTime;
    // },
    // scrolltolower(e) {
    //   console.log(7);
    //   console.log(e);
    // },
    scroll(e) {
      var that = this;
      wx
        .createSelectorQuery()
        .select("#time_axis_list")
        .boundingClientRect(function(rect) {
          // rect.id      // 节点的ID
          // rect.dataset // 节点的dataset
          // rect.left    // 节点的左边界坐标
          // rect.right   // 节点的右边界坐标
          // rect.top     // 节点的上边界坐标
          // rect.bottom  // 节点的下边界坐标
          // rect.width   // 节点的宽度
          // rect.height  // 节点的高度

          //     wx.getSystemInfo({
          // success: function(res) {
          //     // console.log(res.model)
          //     // console.log(res.pixelRatio)
          //     // console.log(res.windowWidth)
          //     // console.log(res.windowHeight);
          //     // that.scrollHeight=res.windowHeight-rect.top;
          //     // console.log(res.language)
          //     // console.log(res.version)
          //     console.info(res.windowHeight-rect.top)
          // }
          // })

          if (rect.top < 153) {
            console.info(rect.top);
            that.mapHeight = 0;
          }
        })
        .exec();
    },
    //秒转时间
    secToTime(s) {
      var t;
      if (s > -1) {
        var hour = Math.floor(s / 3600);
        var min = Math.floor(s / 60) % 60;
        var sec = s % 60;
        if (hour < 10) {
          t = "0" + hour + ":";
        } else {
          t = hour + ":";
        }

        if (min < 10) {
          t += "0";
        }
        t += min + ":";
        if (sec < 10) {
          t += "0";
        }
        t += sec.toFixed(2);
      }
      return t;
    }
  },

  //关闭下拉刷新
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
  }
};
</script>

<style  lang="stylus" scoped>
.page {
  position: absolute;
}

.map_container {
  // position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  height: 80vh;

  map {
    width: 100vw;
    height: 80vh;
  }
}

.map_center {
  margin-top: 68vh;
  height: 70rpx;
  width: 80vw;
  margin-left: 10vw;
  background: #ffffff;
  display: flex;
  padding: 5rpx 8rpx;
  border-radius: 8rpx;

  .map_order_number {
    font-size: 24rpx;
    margin-top: 5rpx;
    color: #666666;
  }

  .map_waybill_state {
    font-size: 28rpx;
  }

  .map_deliverer {
    position: absolute;
    right: calc(10vw + 80rpx);
    border-left: 1px solid #e5e5e5;
    padding-left: 10px;
    height: 50rpx;
    margin-top: 10rpx;
    line-height: 50rpx;
    font-size: 27rpx;
  }

  .map_cover_img {
    width: 70rpx;
    height: 70rpx;
    position: absolute;
    right: 8vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #FAFAFF;

    cover-image {
      height: 24rpx;
      width: 24rpx;
    }
  }
}

.logistics_details {
  bottom: 0rpx;
  width: 100vw;
  height: 70rpx;
  position: fixed;
  text-align: center;
  background: #fff;
  line-height: 70rpx;
  z-index: 999;
}

.message {
  display: block;
  width: 100%;
}

.circle {
  margin-left: 28rpx;
  margin-right: 50rpx;
  display: block;
  height: 50rpx;
  float: left;
}

.lineborder {
  margin-left: 170rpx;
  display: block;
  height: 150rpx;
  border-left: 4rpx solid #e5e5e5;

  .axis_icon_yes {
    position: absolute;
    margin-left: -20rpx;
    width: 40rpx;
    height: 40rpx;
  }

  .message_content {
    margin-left: 30rpx;
    font-size: 26rpx;
  }
}

.time_axis_list {
  position: absolute;
  z-index: 998;
  top: 80vh;
  width: 100vw;
  overflow: hidden;
  padding-top: 40rpx;

  .img_arrow {
    transform: rotate(90deg);
    width: 25rpx;
    height: 70rpx;
  }
}

.scrollView {
  position: absolute;
  z-index: 998;
  display: block;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  white-space: nowrap;
}
</style>
