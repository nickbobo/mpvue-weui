<template>
  <div class="page">
    <span>{{data.NAME}} {{data.ARTIST}} </span>
    <audio :poster="poster" :name="data.NAME" :author="data.ARTIST" :src="src" id="myAudio"></audio>
    <div class="page__bd page__bd_spacing">
      <button class="weui-btn mini-btn" @click="play" size="mini">{{playStatus?"播放":"暂停"}}</button>
      <button class="weui-btn mini-btn" @click="onPlaySeek" size="mini">快进15秒</button>
    </div>

    <progress :percent="songProgress" stroke-width="3" />
    <slider class="progress_slider" step="1" :value="songLeng" min=0 :max="songMax" blockSize=10 blockImageWidth="5" @change="goSongPosition" backgroundColor="#373636" activeColor="#FF1744" />
    <span>-{{songTime}}</span>
    <span>{{time2}}</span>
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
      songTime: "",
      songTimer: null,
      data: {},
      innerAudioContext: {},
      songLeng: 0,
      songProgress: 0,
      songMax: 411,
      timer2:null,
      time2:"00:00",
      time2Number:0
    };
  },
  onLoad() {
    let _this = this;
    wx.getStorage({
      key: "songData",
      success: function(res) {
        _this.data = JSON.parse(res.data);
        _this.getActionMP3(_this.data);
      }
    });
  },
  methods: {
    async getActionMP3(data) {
      this.playStatus = false;
      const song = await this.$store.dispatch("getSongMp3", data.MUSICRID);
      if (typeof this.innerAudioContext.src != "undefined") {
        this.innerAudioContext.destroy();
      }
      wx.getBackgroundAudioPlayerState({
        success: function(res) {
          console.info(res.status);
        }
      });
      this.innerAudioContext = {};
      this.innerAudioContext = wx.createInnerAudioContext();
      this.innerAudioContext.autoplay = true;
      this.innerAudioContext.src = song.data;
      this.innerAudioContext.volume = 0.2;
      this.innerAudioContext.onPlay(() => {
        console.log("开始播放");
      });
      this.innerAudioContext.onError(res => {
        console.log(res.errMsg);
        console.log(res.errCode);
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
    // 播放
    play() {
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
    onPlaySeek() {
      this.songLeng += 15;
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
  background: #3367d6;
}

.progress_slider {
  width: 100px;
}
</style>
