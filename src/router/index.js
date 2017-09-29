import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import Docs from '@/pages/Docs';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/docs',
      name: 'docs',
      component: Docs,
    },
  ],
});
