<template>
  <nav
    class="Vuelma__Breadcrumb breadcrumb"
    :class="modifiers"
    aria-label="breadcrumbs"
  >
    <ul>
      <item
        v-for="(item, index) in items"
        :key="item.name"
        :is-active="index === items.length - 1"
        v-bind="item"
        @click:item="onItemClick"
      ></item>
    </ul>
  </nav>
</template>

<script>
import modifiers from '../utils/modifiers';
import Item from './Breadcrumb/Item';

const componentModifiers = [
  'has-arrow-separator', 'has-bullet-separator', 'has-dot-separator', 'has-succeeds-separator',
  ...modifiers.alignments,
  ...modifiers.sizes,
];

export default {
  name: 'breadcrumb',
  components: {
    Item,
  },
  props: {
    /**
     * The items to be listed inside the breadcrumb component.
     */
    items: {
      type: Array,
      required: true,
    },

    /**
     *  Bulma-specific options
     */
    ...modifiers.props(componentModifiers),
  },
  computed: {
    modifiers() {
      return modifiers.generate(componentModifiers, this.$props);
    },
  },
  methods: {
    onItemClick(item) {
      this.$emit('click:item', item);
    },
  },
};
</script>
