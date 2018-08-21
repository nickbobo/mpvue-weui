<template>
  <div class="page">
    <div class="page">
      <div class="weui-cells__title">音乐搜索</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入歌曲名" :value="searchSongName" v-model="searchSongName"/>
          </div>
        </div>
      </div>
      <div class="page__bd page__bd_spacing">
        <button class="weui-btn mini-btn" type="primary" size="mini" @click="onSongSearch">搜索</button>
      </div>
    </div>
  </div>
</template>

<script>
// Use Vuex

export default {
  data() {
    return {
      searchSongName: '蓝莲花'
    }
  },
  async onLoad(options) {
    const songList = await this.$store.dispatch("getBDSoJson", this.searchSongName);
    // this.musicList = songList.playlist;
    console.info(songList);
  },
  methods: {
    async onSongSearch() {
      const songList = await this.$store.dispatch("getBDSoJson", this.searchSongName);
      // this.musicList = songList.playlist;
      console.info(songList);
    }
  }
};
</script>
<style  lang="stylus" scoped>
.page__bd_spacing {
  margin-top: 30rpx;
  text-align: center;
}
</style>
