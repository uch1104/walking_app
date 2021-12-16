<template>
  <!-- <v-app class="app">
    <Header/>
    <GoogleMap/>
  </v-app> -->
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Baby's Day Out</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        class="mx-2"
        fab
        dark
        small

        color="blue-grey"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <GoogleMap/>
    </v-main>
  </v-app>
</template>

<script>
import 'normalize.css'
// import Search from './components/Search';
// import Registration from './components/Registration';
// import Header from './components/Header';
import GoogleMap from './components/GoogleMap'

export default {
  name: 'App',

  components: {
    // Header,
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
    drawer: null
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