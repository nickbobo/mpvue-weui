<template>
  <div class="page">
    <span>{{data.NAME}} {{data.ARTIST}} </span>
    <audio :poster="poster" :name="data.NAME" :author="data.ARTIST" :src="src" id="myAudio"></audio>
    <button @click="play">{{playStatus?"播放":"暂停"}}</button>
    <button @click="onPlaySeek">快进15秒</button>
    <span>{{songTime}}</span>
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
      data: {}
    };
  },
  onLoad() {
    let _this = this;
    wx.getStorage({
      key: "songData",
      success:  function(res) {
        _this.data = JSON.parse(res.data);
        _this.getActionMP3(_this.data);
      }
    });
    console.info(this.data)
  


    //  console.info(decodeURIComponent(options.data))
    // let data = JSON.parse((options.data));
    // // this.data = data;
    // console.info(data);

    // let musicid = decodeURIComponent(data);
    // console.info(musicid);
    // const song = await this.$store.dispatch("getSongMp3", data.MUSICRID);
    // // console.info(song);

    // this.audioCtx = wx.createAudioContext("myAudio");
    // this.src = song.data;
    // this.audioCtx.setSrc(song.data);
  },
  methods: {

    async getActionMP3(data){
      const song = await this.$store.dispatch("getSongMp3", data.MUSICRID);
      this.audioCtx = wx.createAudioContext("myAudio");
      this.src = song.data;
      this.audioCtx.setSrc(song.data);
    },
    // 播放
    play() {
      if (this.playStatus) {
        this.playStatus = false;
        this.audioCtx.play();
        this.resetTime(this.data.DURATION);
      } else {
        this.playStatus = true;
        this.audioCtx.pause();
      }
    },
    onPlaySeek() {
      this.audioCtx.seek(15);
    },
    // 暂停
    pause() {},
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
          clearInterval(timer);
        }
        _this.songTime = m + "分钟" + s + "秒";
        // console.log(m + "分钟" + s + "秒");
      }
      timer = setInterval(countDown, 1000);
    }
  }
};
</script>

<style>
</style>
