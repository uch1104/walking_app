<template>
  <v-app class="app">
    <Header/>
    <!-- <div class="upper">
      <router-view></router-view>
    </div> -->
    <!-- <div class="lower" v-if="is_searched">
      <Registration/>
    </div> -->
    <GoogleMap/>
  </v-app>
</template>

<script>
import 'normalize.css'
// import Search from './components/Search';
// import Registration from './components/Registration';
import Header from './components/Header';
import GoogleMap from './components/GoogleMap'

export default {
  name: 'App',

  components: {
    Header,
    GoogleMap
    // Search,
    // Registration,
  },
  computed: {
    is_searched() {
      return this.$store.getters.facility == null;
    }
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>



.upper {
  height: 90%;
}

.lower {
  height: 10vh;
}
</style>