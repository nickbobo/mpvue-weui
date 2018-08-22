<template>
  <div class="page">
    <div class="page">
      <div class="weui-cells__title">音乐搜索</div>
      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入歌曲名" :value="searchSongName" v-model="searchSongName" />
          </div>
        </div>
      </div>
      <div class="page__bd page__bd_spacing">
        <button class="weui-btn mini-btn" type="primary" size="mini" @click="onSongSearch">搜索</button>
      </div>

      <div>
        <ul class="song_list" v-for="(items,index) in songList" :key="index" @click="goTOPlay(items)">
          <li>{{items.NAME}}{{items.ARTIST}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// Use Vuex

export default {
  data() {
    return {
      searchSongName: "蓝莲花",
      songList: []
    };
  },
  evil(fn) {
    let Fn = Function; //一个变量指向Function，防止有些前端编译工具报错
    return new Fn("return " + fn)();
  },
  async onLoad(options) {
    const songList = await this.$store.dispatch(
      "getBDSoJson",
      this.searchSongName
    );
    // console.info(songList.data);
    // this.songList = songList.obslist;
    // this.musicList = songList.playlist;
    // let jsonSong = JSON.parse(songList)
    // let data_obj = this.eval("(" + songList.data + ")");
    let song = songList.data.replace(/'/g, '"');
    // let songStr = "'" + song + "'";
    let jsonSong = JSON.parse(song);
    console.info(jsonSong);
    this.songList = jsonSong.abslist;

    // console.info(data_obj);
  },
  methods: {
    async onSongSearch() {
      const songList = await this.$store.dispatch(
        "getBDSoJson",
        this.searchSongName
      );
      this.songList = songList.obslist;
    let song = songList.data.replace(/'/g, '"');
    // let songStr = "'" + song + "'";
    let jsonSong = JSON.parse(song);
    console.info(jsonSong);
    this.songList = jsonSong.abslist;
    },
    goTOPlay(items) {
      console.info(items);
      let data = JSON.stringify(items);
      // console.info(e.mp.currentTarget.dataset.index)
      console.info(data);
      wx.setStorage({
        key: "songData",
        data: data
      });
      wx.navigateTo({
        url: "/pages/music-play/main"
      });
    }
  }
};
</script>
<style  lang="stylus" scoped>
.page__bd_spacing {
  margin-top: 30rpx;
  text-align: center;
}

.song_list {
  height: 80px;
}
</style>
