<template>
  <div id="app">
    <nav-component has-shadow nav-toggle>
      <template slot="nav-left">
        <router-link to="/" class="nav-item">vuelma</router-link>
      </template>

      <template slot="nav-right">
        <router-link to="/" class="nav-item is-tab" exact>Home</router-link>
        <router-link to="/docs" class="nav-item is-tab">Docs</router-link>
      </template>
    </nav-component>
    <router-view></router-view>
  </div>
</template>

<script>
import NavComponent from '@/components/Nav';

export default {
  name: 'app',
  components: {
    NavComponent,
  },
};
</script>

<style lang="scss">
$fa-font-path: '~font-awesome/fonts';
@import '~bulma';
@import '~font-awesome/scss/font-awesome';
</style>
