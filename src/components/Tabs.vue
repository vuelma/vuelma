<template>
  <div class="Tabs tabs" :class="modifiers">
    <ul>
      <item
        v-for="(item, index) in items"
        :key="item.name"
        :is-active="activeItem === item.name"
        v-bind="item"
        @click:item="onItemClick"
      ></item>
    </ul>
  </div>
</template>

<script>
import modifiers from '../utils/modifiers';
import Item from './Tabs/Item';

const componentModifiers = [
  'is-boxed', 'is-toggle', 'is-fullwidth',
  ...modifiers.sizes,
  ...modifiers.alignments,
];

export default {
  name: 'tabs',
  components: {
    Item,
  },
  props: {
    /**
     * The items to be listed inside the tabs component
     */
    items: {
      type: Array,
      required: true,
    },

    /**
     * The initial item with active class
     */
    activeItem: {
      type: String,
      default: () => '',
    },

    /**
     *  Bulma-specific options
     */
    ...modifiers.props(componentModifiers),
  },
  computed: {
    modifiers() {
      return {
        ...modifiers.generate(componentModifiers, this.$props),
      };
    },
  },
  methods: {
    onItemClick(item) {
      this.$emit('click:item', item);
    },
  },
};
</script>
