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
          isRight: true,
          isBoxed: true,
          items: [
            {
              name: 'components',
              label: 'Components',
            },
            {
              name: 'divider1',
              isDivider: true,
            },
            {
              name: 'elements',
              label: 'Elements',
            },
          ],
        },
      ]"
      :startItems="[
        {
          name: 'home',
          label: 'Home',
        },
        {
          name: 'docs',
          label: 'Docs',
        },
      ]"
      :endItems="[
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
      @click:item="(item) => activeItem = item.name"
    >
      <template scope="props" slot="home">
        Custom Slot {{ props.item.name }}
      </template>

      <template scope="props" slot="docs">
        Docs
        <template slot="components">
          Eh
        </template>
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
};
</script>

<style lang="scss">
$fa-font-path: '~font-awesome/fonts';
@import '~bulma';
@import '~font-awesome/scss/font-awesome';
</style>
