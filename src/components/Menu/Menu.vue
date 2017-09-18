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
        <list-item
          v-for="item in item.list"
          v-bind="item"
          :key="item.name"
        ></list-item>
      </ul>
    </template>
    {{ items }}
  </aside>
</template>

<script>
import bus from '@/utils/bus';
import ListItem from './ListItem';

export default {
  name: 'vuelma-menu',
  components: {
    ListItem,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
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

