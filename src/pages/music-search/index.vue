<template>
  <div>
    <input placeholder="这里输入" confirm-type="search" auto-focus='true' @confirm="confirm($event)"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logs: []
    };
  },
  methods:{
    confirm(e){
      console.info(e.mp.detail.value);
    }
  },
  onShow() {
    wx.setNavigationBarTitle({ title: "音乐搜索" });
  }
};
</script>

<style>
</style>
