<template>
  <a
    class="Navbar__item navbar-item"
    :class="{ 'is-active': isActive }"
    @click="click"
  >
    <slot>{{ label }}</slot>
  </a>
</template>

<script>
export default {
  name: 'navbar-item',
  props: {
    /**
     * The unique identifier for the item.
     */
    name: {
      type: String,
      required: true,
    },

    /**
     * The label displayed.
     */
    label: String,

    /**
     * Determines if the item is active.
     */
    isActive: Boolean,
  },
  methods: {
    /**
     * Handle the click event for the item.
     */
    click() {
      this.$emit('click', this.$props);
    },
  },
};
</script>
