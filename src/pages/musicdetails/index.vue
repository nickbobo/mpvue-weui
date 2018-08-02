<template>
  <div>
      <h2>{{type}}</h2>
      <h2>{{data.xsong_name +','+ data.xsinger_name}}</h2>
      <audio :poster="poster" :name="name" :author="author"  :src="src" id="myAudio" ></audio>
      <button @click="play">{{playStatus?"播放":"暂停"}}</button>
      <button @click="onPlaySeek">快进15秒</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        type: "音乐详情",
        data: { },
        src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
        poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
        name: '此时此刻',
        author: '许巍',
        playStatus: true
      }
    },
    onLoad: function(options) {
      let data = JSON.parse(decodeURIComponent(options.data));
      this.data = data;
      console.info(data);


      this.audioCtx = wx.createAudioContext('myAudio')
      this.audioCtx.setSrc(this.src);
    },
    methods: {
      // 播放
      play() {
        if (this.playStatus) {
          this.playStatus = false;
          this.audioCtx.play()
        } else {
          this.playStatus = true;
          this.audioCtx.pause()
        }
      },
      onPlaySeek() {
        this.audioCtx.seek(15)
      },
      // 暂停
      pause() {

      }
    }
  }
</script>

<style scoped>

</style>