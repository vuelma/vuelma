<template>
  <span @click="click">
    <hr class="Dropdown__divider dropdown-divider" v-if="divider">
    <a
      class="Dropdown__item dropdown-item"
      v-else
      v-text="defaultLabel"
      :class="modifiers"
    ></a>
  </span>
</template>

<script>
import genericItem from '../../mixins/genericItem';

export default {
  name: 'dropdown-item',
  mixins: [genericItem],
  props: {
    /**
     * Determine if item is active.
     */
    isActive: Boolean,

    /**
     * Determine if dropdown item is a divider.
     */
    divider: Boolean,
  },
  computed: {
    modifiers() {
      return { 'is-active': this.isActive };
    },
  },
  methods: {
    /**
     * Handle the click event.
     */
    click() {
      this.$parent.hide();
      this.$parent.$emit(`click:${this.name}`);
    },
  },
};
</script>
