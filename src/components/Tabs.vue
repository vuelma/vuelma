<template>
  <div class="Tabs tabs" :class="modifiers">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tabs',
  props: {
    /**
     *  Bulma-specific options
     */
    isCentered: Boolean,
    isRight: Boolean,
    isSmall: Boolean,
    isMedium: Boolean,
    isLarge: Boolean,
    isBoxed: Boolean,
    isToggle: Boolean,
    isFullwidth: Boolean,
  },
  computed: {
    modifiers() {
      return {
        'is-centered': this.isCentered,
        'is-right': this.isRight,
        'is-small': this.isSmall,
        'is-medium': this.isMedium,
        'is-large': this.isLarge,
        'is-boxed': this.isBoxed,
        'is-toggle': this.isToggle,
        'is-fullwidth': this.isFullwidth,
      };
    },
  },
};
</script>
