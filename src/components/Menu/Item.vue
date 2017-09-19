<template>
  <li>
    <a
      :class="{ 'is-active': isActive }"
      v-html="defaultLabel"
      @click="clickItem"
    ></a>

    <transition :name="transition">
      <ul v-show="hasList && displayList">
        <menu-item
          v-for="item in list"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        ></menu-item>
      </ul>
    </transition>
  </li>
</template>

<script>
import bus from '../../utils/bus';
import genericItem from '../../mixins/genericItem';

export default {
  name: 'menu-item',
  mixins: [genericItem],
  props: {
    /**
     * The Bulma specific menu item properties
     */
    transition: String,
    list: Array,
    initiallyOpened: Boolean,
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
    activeItemName() {
      return this.$parent.activeItem || this.$parent.$parent.activeItem;
    },
    shouldActiveParent() {
      return this.$parent.shouldActiveParent || this.$parent.$parent.shouldActiveParent;
    },
    isActive() {
      return (
        (
          !this.hasList
          && this.name === this.activeItemName
        ) || (
          this.shouldActiveParent
          && this.hasList
          && this.list.some(item => item.name === this.activeItemName)
        )
      );
    },
  },
  methods: {
    clickItem() {
      if (this.hasList) {
        this.displayList = !this.displayList;
      }
      bus.$emit('click:item', this.$props);
    },
  },
};
</script>
