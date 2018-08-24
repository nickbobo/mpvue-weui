<template>
  <div class="page">
    <div class="page">
      <!-- <div class="song_select">
        <button class="weui-btn mini-btn" type="primary" size="mini" @click="onSongSelect">{{selectStates?'取消':'选择'}}</button>
      </div> -->

      <div class="weui-cells weui-cells_after-title search_input_center">
        <div class="weui-cell weui-cell_input">
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入歌曲名" :value="searchSongName" v-model="searchSongName" />
          </div>
          <button class="weui-btn mini-btn search_but" type="primary" size="mini" @click="getSongList">搜索</button>
        </div>
      </div>
      <song-list :selectStates="selectStates" :songList="songList" @onSongSelect="onSongSelect" @goTOPlay="goTOPlay" ></song-list>
      <div class="bottom_but" v-if="selectStates">
        <button class="weui-btn" type="primary" size = "mini" @click="onSelectAll">{{selectAllState?'全不选':'全选'}}</button> 
        <button class="weui-btn" type="primary" size = "mini" @click="onSelectPlay">播放</button>
      </div>
    </div>
  </div>
</template>
<script>
import songlistcomp from "@/components/song-list";
export default {
  data() {
    return {
      searchSongName: "一百万个可能",
      songList: [],
      selectStates:false, //选择状态
      selectAllState:false
    };
  },
  evil(fn) {
    let Fn = Function; //一个变量指向Function，防止有些前端编译工具报错
    return new Fn("return " + fn)();
  },
  onLoad(options) {
    this.getSongList();
  },
  methods: {
    async getSongList() {
      const songList = await this.$store.dispatch(
        "getBDSoJson",
        this.searchSongName
      );
      // this.songList = songList.obslist;
      let song = songList.data.replace(/'/g, '"');
      let jsonSong = JSON.parse(song);
      let music = jsonSong.abslist;
      for(let items of music){
        items.checked = false;
        items.ARTIST = this.nbsp2Space(items.ARTIST);
        items.NAME = this.nbsp2Space(items.NAME);
        items.ALBUM = this.nbsp2Space(items.ALBUM);
      }
      this.songList = music;
    },
    goTOPlay(items,index) {
      let data = [];
      if(this.selectStates){
        items.checked = !items.checked;
        this.songList[index] = items;
      }else{
        data.push(items);
        this.jumpPlayPage(data);
      }
    },
    jumpPlayPage(obj){
      let data = JSON.stringify(obj);
        wx.setStorage({
          key: "songData",
          data: data
        });
        wx.navigateTo({
          url: "/pages/music-play/main"
        });
    },
    //选择歌曲
    onSongSelect(){
      this.selectStates=!this.selectStates;
    },
     nbsp2Space(str) {
      return str.replace(/&nbsp;/g, " ");
    },
    //全选
    onSelectAll(){
      for(let items in this.songList){
        if(this.selectAllState){
          this.songList[items].checked = false;
        }else{
          this.songList[items].checked = true;
        }
      }
      this.selectAllState = !this.selectAllState;
    },
    //播放选中
    onSelectPlay(){
      let selectSong = [];
      for(let items of this.songList){
        if(items.checked){
          selectSong.push(items);
        }
      }
      this.jumpPlayPage(selectSong);

    }
  },
  mounted(){
    setTimeout(()=>{
      // this.songList[1].checked = true;
    },3000)
  },
  components: {
    "song-list": songlistcomp
  }
};
</script>
<style  lang="stylus" scoped>
.search_input_center {
  margin-top: 10rpx;
}
.search_but {
  margin-top: 0;
  margin-right: -10rpx !important;
}
.song_select {
  width: 100vw;
  display: flex;
  justify-content: flex-end;
}
.bottom_but
  display flex
  justify-content space-between
  button 
    margin-top 10rpx
</style>
