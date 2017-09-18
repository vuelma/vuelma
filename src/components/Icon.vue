<template>
  <span
    :class="[
      'icon',
      ...modifiers,
    ]"
  >
    <i :class="[`fa fa-${this.name}`]"></i>
  </span>
</template>

<script>
import modifiers from '../utils/modifiers';

const componentModifiers = [
  ...modifiers.sizes,
];

export default {
  name: 'icon',
  props: {
    /**
     * Bulma-specific options.
     */
    name: {
      type: String,
      required: true,
    },
    ...modifiers.props(componentModifiers),
  },
  computed: {
    modifiers() {
      return {
        ...modifiers.generate(componentModifiers, this.$props),
      };
    },
  },
};
</script>
