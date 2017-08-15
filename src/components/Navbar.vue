<template>
  <nav class="Navbar navbar" :class="{ 'is-transparent': transparent }">
    <div class="Navbar__brand navbar-brand">
      <slot name="navbar-brand"></slot>

      <div
        class="Navbar__burger navbar-burger"
        :class="isActiveClass"
        v-if="toggle"
        @click="isActive = !isActive"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div
      class="Navbar__menu navbar-menu"
      :class="[{ 'navbar-menu': toggle }, isActiveClass]"
    >
      <div class="Navbar__start navbar-start">
        <slot name="navbar-start"></slot>
      </div>

      <div class="Navbar__end navbar-end">
        <slot name="navbar-end"></slot>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar-component',
  props: {
    /**
     * Bulma-specific options.
     */
    transparent: Boolean,
    toggle: Boolean,
  },
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    isActiveClass() {
      return {
        'is-active': this.isActive,
      };
    },
  },
};
</script>
