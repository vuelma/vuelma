<template>
  <nav
    class="Navbar navbar"
    :class="{ 'is-transparent': transparent }"
    v-click-outside="hide"
  >
    <div class="Navbar__brand navbar-brand">
      <slot name="navbar-brand"></slot>

      <div
        class="Navbar__burger navbar-burger"
        :class="isActiveClass"
        v-if="hasBurger"
        @click="toggle"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div
      class="Navbar__menu navbar-menu"
      :class="isActiveClass"
      @click="hide"
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
    hasBurger: Boolean,
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
  methods: {
    /**
     * Toggle the navbar menu.
     */
    toggle() {
      this.isActive = !this.isActive;
    },

    /**
     * Hide the navbar menu.
     */
    hide() {
      this.isActive = false;
    },
  },
};
</script>
