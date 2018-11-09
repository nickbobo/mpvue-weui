<template>
  <div class="page">
    <div class="page__hd">
      <div class="page__title">Picker</div>
      <div class="page__desc">选择器，这里使用小程序原生的picker。</div>
    </div>
    <div class="page__bd">
      <div class="weui-btn-area">
        <picker @change="bindPickerChange" :value="index" :range="array">
          <button type="default">单列选择器{{arrayValue}}</button>
        </picker>
        <picker class="weui-btn" mode="multiSelector" @change="MultiPickerChange" :value="indexMulPicker" :range="multiArray" @columnchange="MultiPickerColumChange">
          <button type="default">多列选择器</button>
        </picker>
        <picker class="weui-btn" mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
          <button type="default">时间选择器</button>
        </picker>
        <picker class="weui-btn" mode="date" :value="date" start="1990-01-01" end="2020-12-12" @change="bindDateChange">
          <button type="default">日期选择器</button>
        </picker>
        <picker mode="multiSelector" :value="dateTime" @change="changeDateTime" @columnchange="changeDateTimeColumn" :range="dateTimeArray">
          <view class="tui-picker-detail">
            <button type="default">日期时间选择器（精确到秒）</button>
            选择日期时间: {{dateTimeArray[0][dateTime[0]]}}-{{dateTimeArray[1][dateTime[1]]}}-{{dateTimeArray[2][dateTime[2]]}} {{dateTimeArray[3][dateTime[3]]}}:{{dateTimeArray[4][dateTime[4]]}}:{{dateTimeArray[5][dateTime[5]]}}
          </view>
        </picker>

        <picker mode="multiSelector" :value="dateTime1" @change="changeDateTime1" @columnchange="changeDateTimeColumn1" :range="dateTimeArray1">
          <view class="tui-picker-detail">
            <button type="default">日期时间选择器（精确到分）</button>
            选择日期时间: {{dateTimeArray1[0][dateTime1[0]]}}-{{dateTimeArray1[1][dateTime1[1]]}}-{{dateTimeArray1[2][dateTime1[2]]}} {{dateTimeArray1[3][dateTime1[3]]}}:{{dateTimeArray1[4][dateTime1[4]]}}
          </view>
        </picker>

        <picker class="weui-btn" mode="region" :range="region" @change="CityChange">
          <button type="default">城市选择器</button>
          <view class="picker">
            当前选择：{{region[0]}}，{{region[1]}}，{{region[2]}}
          </view>
        </picker>
        <button type="default" class="weui-btn" @click="multiLinkagePicker">多级联动</button>
      </div>
    </div>
  </div>
</template>

<script>
import { dateTimePicker, getMonthDay } from "@/utils/dateTimePicker";
export default {
  data() {
    return {
      array: ["美国", "中国", "巴西", "日本"],
      index: 0,
      indexMulPicker: [0, 1, 1],
      multiArray: [
        ["无脊柱动物", "脊柱动物"],
        ["扁性动物", "线形动物", "环节动物", "软体动物", "节肢动物"],
        ["猪肉绦虫", "吸血虫"]
      ],
      region: ["广东省", "广州市", "海珠区"],
      arrayValue: "",
      time: "12:00",
      date: "2018-10-01",


      dateTimeArray: null,
      dateTime: null,
      startYear: 2000,
      endYear: 2050,

      dateTimeArray1: null,
      dateTime1: null


    };
  },
  onLoad() {

    //初始化
    var obj = dateTimePicker(this.startYear, this.endYear);
    this.dateTime = obj.dateTime;
    this.dateTimeArray = obj.dateTimeArray;



    var obj1 = dateTimePicker(this.startYear, this.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();
        this.dateTime1 = obj1.dateTime;
    this.dateTimeArray1 =obj1.dateTimeArray;
  },
  methods: {
    //点击确定触发
    changeDateTime(e) {
      this.dateTime = e.mp.detail.value;
    },
    //下拉滚动触发
    changeDateTimeColumn(e) {
      let arr = this.dateTime,
        dateArr = this.dateTimeArray;
      arr[e.mp.detail.column] = e.mp.detail.value;
      dateArr[2] = getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
      this.dateTimeArray = dateArr;
      this.dateTime = arr;
    },

    changeDateTime1(e) {
      this.dateTime1= e.mp.detail.value;
    },
    changeDateTimeColumn1(e) {
      var arr = this.dateTime1,
        dateArr = this.dateTimeArray1;
      arr[e.mp.detail.column] = e.mp.detail.value;
      dateArr[2] = getMonthDay(
        dateArr[0][arr[0]],
        dateArr[1][arr[1]]
      );
      this.dateTimeArray1=dateArr;
      this.dateTime1=arr;
    },
    bindPickerChange(e) {
      this.arrayValue = this.array[e.mp.detail.value];
      console.log("选中的值为：" + this.array[e.mp.detail.value]);
    },
    MultiPickerChange(e) {
      console.log(
        "选中的值为：" +
          this.multiArray[0][e.mp.detail.value[0]] +
          "-" +
          this.multiArray[1][e.mp.detail.value[1]] +
          "-" +
          this.multiArray[2][e.mp.detail.value[2]]
      );
    },
    MultiPickerColumChange(e) {
      console.log(
        "列发生变化：" +
          "第" +
          parseInt(e.mp.detail.column + 1) +
          "列发生了变化，这列变化的值为:" +
          this.multiArray[e.mp.detail.column][e.mp.detail.value]
      );
    },
    bindTimeChange(e) {
      console.log("选中的时间为：" + e.mp.detail.value);
    },
    bindDateChange(e) {
      console.log("选中的日期为：" + e.mp.detail.value);
    },
    CityChange(e) {
      console.info(e.mp);
      this.region = e.mp.detail.value;
      console.log("选中的城市为：" + e.mp.detail.value);
    },
    multiLinkagePicker() {
      wx.navigateTo({
        url: "/pages/mulLinkagePicker/main"
      });
    }
  }
};
</script>

<style>
</style>
