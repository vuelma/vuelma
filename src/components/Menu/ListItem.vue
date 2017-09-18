<template>
  <li>
    <a
      :class="{ 'is-active': isActive }"
      v-html="label"
      @click="clickItem"
    ></a>

    <transition :name="transition">
      <ul v-show="hasList && displayList">
        <vuelma-menu-list-item
          v-for="item in list"
          :key="item.name"
          :label="item.label"
          :name="item.name"
          :is-active="item.isActive"
          :callback="item.callback"
        ></vuelma-menu-list-item>
      </ul>
    </transition>
  </li>
</template>

<script>
import bus from '@/utils/bus';

export default {
  name: 'vuelma-menu-list-item',
  props: {
    label: String,
    transition: String,
    list: Array,
    isActive: Boolean,
    initiallyOpened: Boolean,
    callback: Function,
    name: String,
  },
  data() {
    return {
      displayList: !!this.initiallyOpened,
    };
  },
  computed: {
    hasList() {
      return Array.isArray(this.list) && this.list.length > 0;
    },
  },
  methods: {
    clickItem() {
      if (!this.hasList) {
        this.callback(this.$props);
      } else {
        this.displayList = !this.displayList;
      }
      bus.$emit('click:item', this.$props);
    },
  },
};
</script>
