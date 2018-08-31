

<template>
  <div class="page">
    <div class="page__hd">
      <div class="page__title">页面通讯</div>
      <div class="page__desc">利用 vuex 实现数据的管理</div>
      <div>{{openId}}</div>
    </div>
    <div class="page__bd page__bd_spacing">
      <button class="weui-btn mini-btn" type="warn" size="mini" @click="getMpvueInfo">点击显示 stateMpvueInfo => mpvueInfo</button>
      <button class="weui-btn mini-btn" type="primary" size="mini" @click="commitMpvueInfo">点击更新 mpvueInfoUpate => mpvueInfo</button>
      <div class="mpvueInfo-desc" v-show="showMpvueInfo">{{mpvueInfo}}</div>
      <button type="primary" class="mt-15" @click="turnToVuexPage">点击跳转</button>
    </div>
    <t-dialog :show.sync="showDialog"></t-dialog>
  </div>
</template>

<script>
// import Fly from "flyio/dist/npm/wx";
import dialog from "@/components/dialog-index";
import { mapGetters, mapMutations ,mapState } from "vuex";
export default {
  data() {
    return {
      stateMpvueInfo: "",
      showMpvueInfo: true,
      showDialog: false
    };
  },
  getNewsData: function(type) {},
  async onLoad(options) {
    console.info(this.$store.state);
    this.showDialog=true;
    console.log(`url携带的参数为: ${JSON.stringify(options)}`);
    wx.showLoading({
      title: "加载中",
      mask: true
    });
    // const sojson = await this.$store.dispatch("getSojson", "北京");
    const qq = await this.$store.dispatch("getQQMusic", '934858124');
    console.log(this.stateMpvueInfo, qq);


    wx.hideLoading();
    // let fly = new Fly(); // 创建fly实例
    // fly
    //   .get("https://www.sojson.com/open/api/weather/json.shtml", {
    //     city: "北京"
    //   })
    //   .then(res => {
    //     wx.hideLoading();
    //     console.info(res.data);
    //     // this.contentNewsList = ;
    //   });
  },
  methods: {
    ...mapMutations({
      setMpvueInfoVuex: "SET_MPVUEINFO",
      setOpenId: 'SET_OPEN_ID'
    }),
    turnToVuexPage() {
      wx.navigateTo({
        url: "/pages/vuexPage/main"
      });
    },
    getMpvueInfo() {
      console.info(this);
      this.setOpenId('openid001');
      // this.showMpvueInfo = !this.showMpvueInfo;
      this.setMpvueInfoVuex(this.stateMpvueInfo);
    },
    commitMpvueInfo() {
      this.setOpenId('openid002');
      let mpvueInfoUpate =
        "基于1 Vue.js 的小程序开发框架，从底层支持 Vue.js 语法和构建工具体系。created by 美团点评";
      this.setMpvueInfoVuex(mpvueInfoUpate);
    }
  },
  computed: {
    ...mapGetters(["mpvueInfo","openId"])
  },
  components: {
    "t-dialog": dialog
  }
};
</script>

<style>
.mpvueInfo-desc {
  margin-top: 15px;
  font-size: 18px;
  color: #333;
  text-align: justify;
  word-break: break-all;
}
.mt-15 {
  margin-top: 15px;
}
</style>
