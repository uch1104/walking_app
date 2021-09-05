import Vue from 'vue';
import VueRouter from 'vue-router';
import Search from './components/Search.vue';
import Facilities from './components/Facilities.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Search },
    { path: '/facilities', component: Facilities },
];

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router;