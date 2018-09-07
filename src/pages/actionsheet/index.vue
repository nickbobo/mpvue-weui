<template>
  <div class="page">
    <div class="page__hd">
      <div class="page__title">ActionSheet</div>
      <div class="page__desc">弹出式菜单，采用小程序原生的actionsheet</div>
    </div>
    <div class="page__bd">
      <div class="weui-btn-area">
        <button type="default" @click="open">ActionSheet</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    open() {
      wx.showActionSheet({
        itemList: ['A', 'B', 'C'],
        success: function (res) {
          console.info(res);
          console.log(res.tapIndex)
        }
      });
      wx.getSystemInfo({
        success:(res)=>{
          console.info(res.screenWidth+"X"+res.screenHeight);
        }
      })
    }
  }
}
</script>

<style>

</style>
