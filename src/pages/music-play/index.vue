<template>
  <div class="page">
    <progress :percent="songProgress" stroke-width="3" />
    <div class="align_cen song_name">{{data.NAME}}</div>
    <div class="align_cen">——{{data.ARTIST}}——</div>
    <audio :poster="poster" :name="data.NAME" :author="data.ARTIST" :src="src" id="myAudio"></audio>
    <div class=" song_but">
      <button class="weui-btn" @click="upperSong" size="mini">上一曲</button>
      <button class="weui-btn" @click="onPlayByPause" size="mini">{{playStatus?"播放":"暂停"}}</button>
      <button class="weui-btn" @click="nextSong" size="mini">下一曲</button>
      
      
    </div>
    <div class="song_but">
      <button class="weui-btn" @click="onPlaySeek(true)" size="mini">快退15秒</button>
<button class="weui-btn" @click="onPlaySeek(false)" size="mini">快进15秒</button>
    </div>
    <div class="time_progress">
      <span>{{time2}}</span>
      <slider class="progress_slider" step="1" :value="songLeng" 
      min=0 :max="songMax" blockSize=10 blockImageWidth="5" @change="goSongPosition" 
      backgroundColor="#373636" activeColor="#FF1744" />
      <span>-{{songTime}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songMp3Url: "",
      poster:
        "http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000",
      name: "此时此刻",
      author: "许巍",
      playStatus: true,
      src: "",
      songTime: "00:00",
      songTimer: null,
      data: {},
      innerAudioContext: {},
      songLeng: 0,
      songProgress: 0,
      songMax: 411,
      timer2:null,
      time2:"00:00",
      time2Number:0,
      songPlayPosition:0,
      songList:[]
    };
  },
  onLoad() {
    let _this = this;
    wx.getStorage({
      key: "songData",
      success: function(res) {
        _this.songList = JSON.parse(res.data);
        _this.data = _this.songList[0];
        _this.getActionMP3(_this.data);
      }
    });
  },
  methods: {
    async getActionMP3(data) {
      this.playStatus = false;
      // console.info(data);
      // return;
      const song = await this.$store.dispatch("getSongMp3", data.MUSICRID);
      if (typeof this.innerAudioContext.src != "undefined") {
        this.innerAudioContext.destroy();
      }
      this.innerAudioContext = {};
      this.innerAudioContext = wx.createInnerAudioContext();
      this.innerAudioContext.autoplay = true;
      this.innerAudioContext.src = song.data;
      this.innerAudioContext.volume = 0.2;
      this.innerAudioContext.onPlay(() => {
        console.log("开始播放");
      });

      //监听播放结束
      this.innerAudioContext.onEnded(() => {
        setTimeout(() => {
          clearTimeout(this.timer2);
          this.playStatus = true;
          this.songLeng = 0;
          this.songProgress = 0;
        }, 1000);
      });

      this.songLeng = 0;
      this.songProgress = 0;
      this.songMax = this.data.DURATION;
      clearTimeout(this.songTimer);
      clearTimeout(this.timer2);
      this.resetTime(this.data.DURATION);
      this.justTimer(0);
    },
    //上一曲
    upperSong(){
      if(this.songPlayPosition==0){
        console.info("已经是第一条了")
        return;
      }
      this.songPlayPosition--;
      this.data = this.songList[this.songPlayPosition];
      this.getActionMP3(this.data);
    },
    //下一曲
    nextSong(){
      if(this.songPlayPosition==(this.songList.length-1)){
        console.info("已经是最后一条了")
        return;
      }
      this.songPlayPosition++;
      this.data = this.songList[this.songPlayPosition];
      this.getActionMP3(this.data);
    },
    // 播放/暂停
    onPlayByPause() {
      if (this.playStatus) {
        this.playStatus = false;
        this.innerAudioContext.play();
        clearTimeout(this.songTimer);
        clearTimeout(this.timer2);
        if (this.songLeng == 0) {
          this.resetTime(this.data.DURATION);
          this.justTimer(0);
        } else {
          this.updateSongPlayTime();
        }
        
      } else {
        this.playStatus = true;
        this.innerAudioContext.pause();
        clearTimeout(this.songTimer);
        clearTimeout(this.timer2);
      }
    },
    //快进15秒
    onPlaySeek(state) {
      console.info(this.songLeng)
      if(state){
        this.songLeng -= 15;
        if(this.songLeng<0){
          this.songLeng =0;
        }
      }else{
        this.songLeng += 15;
      }
      
      this.updateSongPlayTime();
    },
    //拖动
    goSongPosition(e) {
      this.songLeng = e.mp.detail.value;
      this.updateSongPlayTime();
    },
    //更新歌曲播放时间
    updateSongPlayTime() {
      clearTimeout(this.timer2);
      clearTimeout(this.songTimer);
      this.resetTime(this.data.DURATION - this.songLeng);
      this.justTimer(this.songLeng);
      this.innerAudioContext.seek(this.songLeng);
      this.songProgress = 100 / this.data.DURATION * this.songLeng;
    },
    resetTime(time) {
      var timer = null;
      var t = time;
      var m = 0;
      var s = 0;
      m = Math.floor((t / 60) % 60);
      m < 10 && (m = "0" + m);
      s = Math.floor(t % 60);
      let _this = this;
      function countDown() {
        s--;
        s < 10 && (s = "0" + s);
        if (s.length >= 3) {
          s = 59;
          m = "0" + (Number(m) - 1);
        }
        if (m.length >= 3) {
          m = "00";
          s = "00";
          clearInterval(_this.songTimer);
        }
        _this.songLeng++;
        _this.songProgress += 100 / _this.data.DURATION;
        _this.songTime = m + ":" + s + "";
      }
      _this.songTimer = setInterval(countDown, 1000);
    },
    justTimer(time){
      let _this=this, s = 0,m=0;
      m = Math.floor((time / 60) % 60);
      m < 10 && (m = "0" + m);
      s = Math.floor(time % 60);
      function countDowns() {
        s++;
        s < 10 && (s = "0" + s);
        if(s>=60){
          s='00';
          m=Number(m)+1;
        }
        m = Number(m);
        m < 10 && (m = "0" + m);
        _this.time2 = m+":"+s
      }
      _this.timer2 = setInterval(countDowns,1000);
    }
  }
};
</script>

<style  lang="stylus" scoped>
.page {
  background: #78c3ec;
}
.align_cen
  text-align center
  width 100vm
  font-size 4vm
.song_name
  font-size 8vm
  font-weight bold
  padding-top 40rpx
.progress_slider {
  width: 440rpx;
}
.time_progress,.song_but
  display flex
  justify-content center
  align-items center
  button 
    margin-top 10rpx
</style>
