<template>
  <nav class="Nav nav" :class="{ 'has-shadow': hasShadow }">
    <div class="container">
      <div class="Nav__left nav-left">
        <slot name="nav-left"></slot>
      </div>

      <div class="Nav__center nav-center">
        <slot name="nav-center"></slot>
      </div>

      <span
        class="Nav__togle nav-toggle"
        :class="isActiveClass"
        v-if="navToggle"
        @click="isActive = !isActive"
      >
        <span></span>
        <span></span>
        <span></span>
      </span>

      <div
        class="Nav__right nav-right"
        :class="[{ 'nav-menu': navToggle }, isActiveClass]"
      >
        <slot name="nav-right"></slot>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'nav-component',
  props: {
    /**
     * Bulma-specific options.
     */
    hasShadow: Boolean,
    navToggle: Boolean,
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
