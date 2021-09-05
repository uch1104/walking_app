<template>
  <v-app class="app">
    <Header/>
    <div class="upper">
      <Search/>
    </div>
    <div class="lower">
      <Registration/>
    </div>
  </v-app>
</template>

<script>
import 'normalize.css'
import Search from './components/Search';
import Registration from './components/Registration';
import Header from './components/Header';

export default {
  name: 'App',

  components: {
    Header,
    Search,
    Registration,
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>



.upper {
  margin-top: 10vh;
}

.lower {
  margin-top: 10vh;
}
</style>