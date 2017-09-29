<template>
  <div id="app">
    <navbar
      is-info
      has-burger
      :brandItems="[
        {
          name: 'home',
          label: 'Home',
        },
        {
          name: 'docs',
          label: 'Docs',
        },
      ]"
      :active-item="activeItem"
      @click:item="navbarItemClick"
    >
      <template scope="props" slot="home">
        vuelma
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
  data() {
    return {
      activeItem: 'home',
    };
  },
  methods: {
    navbarItemClick(item) {
      this.activeItem = item.name;
      this.$router.push({ name: item.name });
    },
  },
};
</script>

<style lang="scss">
$fa-font-path: '~font-awesome/fonts';
@import '~bulma';
@import '~font-awesome/scss/font-awesome';
</style>
