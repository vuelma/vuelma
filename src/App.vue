<template>
  <div id="app">
    <navbar is-transparent has-burger>
      <template slot="navbar-brand">
        <router-link to="/" class="navbar-item">vuelma</router-link>
      </template>

      <template slot="navbar-start">
        <router-link to="/" class="navbar-item" exact>Home</router-link>
        <router-link to="/docs" class="navbar-item">Docs</router-link>
      </template>
    </navbar>

    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';

export default {
  name: 'app',
  components: {
    Navbar,
  },
};
</script>

<style lang="scss">
$fa-font-path: '~font-awesome/fonts';
@import '~bulma';
@import '~font-awesome/scss/font-awesome';
</style>
