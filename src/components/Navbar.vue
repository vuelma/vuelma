<template>
  <nav
    class="Navbar navbar"
    :class="modifiers"
    v-click-outside="hide"
  >
    <div class="Navbar__brand navbar-brand">
      <navbar-item
        v-for="brandItem in brandItems"
        v-bind="brandItem"
        :key="brandItem.name"
        :is-active="activeItem === brandItem.name"
        @click="clickItem(brandItem)"
      >
        <slot :name="brandItem.name" :item="brandItem"></slot>
      </navbar-item>

      <div
        class="Navbar__burger navbar-burger"
        :class="isActiveClass"
        v-if="hasBurger"
        @click="toggle"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div
      class="Navbar__menu navbar-menu"
      :class="isActiveClass"
      @click="hide"
    >
      <div class="Navbar__start navbar-start">
        <navbar-item
          v-for="startItem in startItems"
          v-bind="startItem"
          :key="startItem.name"
          :is-active="activeItem === startItem.name"
          @click="clickItem(startItem)"
        >
          <slot :name="startItem.name" :item="startItem"></slot>
        </navbar-item>
      </div>

      <div class="Navbar__end navbar-end">
        <navbar-item
          v-for="endItem in endItems"
          v-bind="endItem"
          :key="endItem.name"
          :is-active="activeItem === endItem.name"
          @click="clickItem(endItem)"
        >
          <slot :name="endItem.name" :item="endItem"></slot>
        </navbar-item>
      </div>
    </div>
  </nav>
</template>

<script>
import NavbarItem from '@/components/Navbar/Item';
import modifiers from '@/utils/modifiers';
import clickOutside from '@/directives/clickOutside';

const componentModifiers = [
  'is-transparent',
];

export default {
  name: 'navbar-component',
  components: {
    NavbarItem,
  },
  props: {
    /**
     * The items for the Navbar Brand section.
     */
    brandItems: Array,

    /**
     * The items for the Navbar Start section.
     */
    startItems: Array,

    /**
     * The items for the Navbar End section.
     */
    endItems: Array,

    /**
     * The active item.
     */
    activeItem: String,

    /**
     *  Bulma-specific options
     */
    hasBurger: Boolean,
    ...modifiers.props(componentModifiers),
  },
  directives: {
    clickOutside,
  },
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    isActiveClass() {
      return {
        'is-active': this.isActive,
      };
    },
    modifiers() {
      return modifiers.generate(componentModifiers, this.$props);
    },
  },
  methods: {
    /**
     * Toggle the navbar menu.
     */
    toggle() {
      this.isActive = !this.isActive;
    },

    /**
     * Hide the navbar menu.
     */
    hide() {
      this.isActive = false;
    },

    /**
     * Handle the click event for navbar items.
     */
    clickItem(item) {
      this.$emit('click:item', item);
    },
  },
};
</script>
