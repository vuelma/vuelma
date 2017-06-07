<template>
  <nav class="Nav nav" :class="{ 'has-shadow': hasShadow }">
    <div class="container">
      <div class="nav-left">
        <slot name="nav-left"></slot>
      </div>

      <div class="nav-center">
        <slot name="nav-center"></slot>
      </div>

      <span
        class="nav-toggle"
        :class="isActiveClass"
        v-if="navToggle"
        @click="isActive = !isActive"
      >
        <span></span>
        <span></span>
        <span></span>
      </span>

      <div
        class="nav-right"
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
