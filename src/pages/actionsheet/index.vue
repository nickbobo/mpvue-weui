<template>
  <div class="page">
    <!-- <div class="page__hd">
      <div class="page__title">ActionSheet</div>
      <div class="page__desc">弹出式菜单，采用小程序原生的actionsheet</div>
    </div>
    <div class="page__bd">
      <div class="weui-btn-area">
        <button type="default" @click="open">ActionSheet</button>
      </div>
    </div> -->

    <div class="page__hd">
      <div class="page__title">ActionSheet</div>
      <div class="page__desc">弹出式菜单，采用小程序原生的actionsheet</div>
    </div>
    <div class="page__bd">
      <div class="weui-btn-area">
        <mp-actionsheet
          :actions="actions"
          v-model="value"
        >
          <button type="default">ActionSheet：{{value}}</button>
        </mp-actionsheet>
      </div>
    </div>
  </div>
</template>

<script>

import MpActionsheet from 'mp-weui/packages/actionsheet'


export default {
  data() {
    return {
      actions: ['A', 'B', 'C'],
      value: ''
    }
  },
  methods: {
    open() {
      // wx.showActionSheet({
      //   itemList: ['A', 'B', 'C'],
      //   success: function (res) {
      //     console.info(res);
      //     console.log(res.tapIndex)
      //   }
      // });

    }
  },
  components: {
    "mp-actionsheet":MpActionsheet
  }
}
</script>

<style>
</style>
