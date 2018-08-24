<template>
  <scroll-view style="height:350px;" scroll-y='true'>
    <div class="song_list_items" v-for="(items,index) in songList" :key="index" @click="goTOPlay(items,index)" 
    @touchstart="touchstart" @touchend="touchend" @longtap="onLongTap" >
      <div  v-if="selectStates"  class='song_checked_cen'>
        <div v-if="!items.checked">
          <div class='icon_none'></div>
        </div>
        <div v-if="items.checked" >
          <icon type="success" size="20" color="red" />
        </div>
      </div>
      <div class="song_cen">
        <ul class="song_list">
          <li><div class="song_name">{{items.NAME}}</div><div class="song_artist">{{items.ARTIST}}&nbsp;·&nbsp;{{items.ALBUM}}</div></li>
        </ul>
      </div>
    </div>
  </scroll-view>
</template>

<script>
export default {
  data(){
    return{
      has:this.selectStates,
      startTime:0,
      endTime:0
    }
  },
  props: ['songList','selectStates'],
  methods: {
    goTOPlay(items,index) {
      if(this.endTime - this.startTime < 350) {
        this.$emit('goTOPlay', items,index);
      }
      // console.info(id)
      
    },
    onLongTap(e){
      this.$emit('onSongSelect');
    },
    touchstart(e){
      this.startTime = e.timeStamp;
    },
    touchend(e){
    this.endTime = e.timeStamp;
    }
  }
}
</script>

<style  lang="stylus" scoped>
.page__bd_spacing {
  // margin-top: 30rpx;
  text-align: center;
}

.search_input_center {
  margin-top: 10rpx;
}

.search_but {
  margin-top: 0;
  margin-right: -10rpx !important;
}

.icon_none
  width: 40rpx;
  height: 40rpx;
  border: 1rpx solid #d6d6d6;
  border-radius: 50vw;

.song_list_items
  display:flex
  border-bottom:1rpx solid #d6d6d6

.song_list {
  margin-top: 20rpx;
}

.song_select {
  width: 100vw;
  display: flex;
  justify-content: flex-end;
}
ul 
  li
    margin-left 2vw
    width 96vw
    .song_name
      font-size 4vw
      font-weight 500
    .song_artist
      font-weight 100
      font-size 3vw;
    div
      white-space:nowrap; 
      text-overflow:ellipsis; /* for internet explorer */ 
      overflow:hidden; 
      width:90vw
      display:block;
.song_checked_cen
  display:flex
  div
    display:flex
    align-items center
    margin-left 4rpx
</style>
