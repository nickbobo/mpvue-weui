<template>
  <div>
    <div> <input type="text" name="qqnumber" class="qqnumber" placeholder="请输入qq号" v-model="qqnumber">
      <button @click="onQuery('qqnumber')">查询</button>
    </div>
    <div v-for="item in musicList" :key="item.xqusic_id">
      <t-music :text="item.xsong_name" :muid="item.xqusic_id" :items="item"   v-on:goMusicDetails="goMusicDetails" ></t-music>
      <!-- {{ item.xsong_name }} -->
    </div>
  </div>
</template>

<script>
// import dialog from "@/components/dialog-index";
import music from "@/components/music-list";
export default {
  data() {
    return {
      musicList: [],
      qqnumber: "934858124"
    };
  },
  async onLoad(options) {
    const qqmusicList = await this.$store.dispatch("getQQMusic", "934858124");
    this.musicList = qqmusicList.data.data.playlist;
    console.info(qqmusicList);
  },
  methods: {
    getQQMusic() {},
    async onQuery(number) {
      const qqmusicList = await this.$store.dispatch("getQQMusic", this.qqnumber);
      this.musicList = qqmusicList.playlist;
      console.info(this.qqnumber);
    },
    goMusicDetails(items) {
      console.info(items);
      let data = JSON.stringify(items);
      wx.navigateTo({
        url: "/pages/musicdetails/main?data="+data
      });
    }
  },
  components: {
    "t-music": music
  }
};
</script>

<style>
</style>