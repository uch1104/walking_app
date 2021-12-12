<template>
    <header @click="nullFacility"><router-link to='/' class="link">Baby's Day Out</router-link></header>
</template>

<script>
export default {
    methods: {
      nullFacility() {
          this.$store.state.facilities = null
      }
    }
}
</script>

<style scoped>
header {
    font-size: 25px;
    font-weight: bold;
    width: 100%;
    height: 7vh;
    line-height: 7vh;
    text-align: center;
    background-color: aquamarine;
}

.link {
    text-decoration: none;
}
</style>