<template>
  <div>
    <p class="music-list" @click="onClick(items)">
      {{text}}
    </p>
  </div>
</template>

<script>
export default {
  props: ['text', 'items'],
  onLoad(){
    console.info(this.text)
  },
  methods: {
    onClick(items) {
      // console.info(id)
      this.$emit('goMusicDetails', items);
    }
  }
}
</script>

<style>
.music-list {
  padding: 10px;
}
</style>
