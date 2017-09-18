<template>
  <aside class="Vuelma__menu menu">
    <template v-for="item in items">
      <p
        class="Vuelma__menu-label menu-label"
        :key="item.name"
        v-if="item.label.length"
        v-html="item.label"
      ></p>

      <ul
        class="menu-list"
        :key="item.name"
      >
        <item
          v-for="item in item.list"
          v-bind="item"
          :key="item.name"
        ></item>
      </ul>
    </template>
  </aside>
</template>

<script>
import bus from '../utils/bus';
import Item from './Menu/Item';

export default {
  name: 'menu',
  components: {
    Item,
  },
  props: {
    /**
     * The items to be listed inside the menu component.
     */
    items: {
      type: Array,
      required: true,
    },

    /**
     * The item name to have the is-active class.
     */
    activeItem: String,

    /**
     * Determines if the parent item will also be active if a child is active.
     */
    shouldActiveParent: Boolean,
  },
  methods: {
    clickItem(item) {
      this.$emit('click:item', item);
    },
  },
  mounted() {
    bus.$on('click:item', this.clickItem);
  },
};
</script>

