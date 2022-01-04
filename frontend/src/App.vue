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
        @click="switchDialog"
        color="blue-grey"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Registration></Registration>
      <GoogleMap></GoogleMap>
    </v-main>
  </v-app>
</template>

<script>
import 'normalize.css'
// import Search from './components/Search';
// import Header from './components/Header';
import GoogleMap from './components/GoogleMap';
import Registration from './components/Registration.vue';


export default {
  name: 'App',

  components: {
    // Header,
    GoogleMap,
    // Search,
    Registration
  },
  computed: {
    is_searched() {
      return this.$store.getters.facility == null;
    }
  },
  methods: {
    switchDialog() {
      this.$store.commit('switchDialog')
    }
  },
  data: () => ({
    drawer: null,
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