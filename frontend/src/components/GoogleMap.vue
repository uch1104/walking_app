<template>
  <div id="google-map"></div>
</template>

<script>
import mapService from '../mapservice'
export default {
  mounted() {
    mapService.init()
  },
}
</script>

<style scoped>
#google-map {
  width: 100%;
  height: 100%;
}
</style>