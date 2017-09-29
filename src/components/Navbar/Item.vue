<template>
  <a
    class="Navbar__item navbar-item"
    :class="modifiers"
    @click.stop="click"
  >
    <template v-if="hasDropdown">
      <a class="navbar-link">
        <slot>{{ label }}</slot>
      </a>
      <div
        class="Navbar__dropdown navbar-dropdown"
        :class="dropdownModifiers"
        v-click-outside="hide"
      >
        <template
          v-for="item in items"
        >
          <navbar-item
            v-if="!item.isDivider"
            v-bind="item"
            :key="item.name"
            :active-item="activeItem"
          >
            <slot :name="item.name" :item="item"></slot>
          </navbar-item>

          <hr class="is-divider" v-else :key="item.name">
        </template>
      </div>
    </template>

    <template v-else>
      <slot>{{ label }}</slot>
    </template>
  </a>
</template>

<script>
import bus from '@/utils/bus';
import clickOutside from '@/directives/clickOutside';

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
     * The active item.
     */
    activeItem: String,

    /**
     * The items for dropdown navbar item.
     */
    items: {
      type: Array,
      default: () => ([]),
    },

    /**
     * Determines if the dropdown opens on hover.
     */
    isHoverable: Boolean,

    /**
     * Determines if the item is a divider.
     */
    isDivider: Boolean,

    /**
     * Determines if the dropdown menu is at the right.
     */
    isRight: Boolean,

    /**
     * Determines if the dropdown menu is boxed.
     */
    isBoxed: Boolean,
  },
  directives: {
    clickOutside,
  },
  data() {
    return {
      isOpened: false,
    };
  },
  mounted() {
    bus.$on('hide', this.hide);
  },
  computed: {
    hasDropdown() {
      return this.items.length > 0;
    },
    isActive() {
      return (this.activeItem === this.name && !this.hasDropdown) || this.isOpened;
    },
    modifiers() {
      return {
        'is-active': this.isActive,
        'has-dropdown': this.hasDropdown,
        'is-hoverable': this.isHoverable,
      };
    },
    dropdownModifiers() {
      return {
        'is-right': this.isRight,
        'is-boxed': this.isBoxed,
      };
    },
  },
  methods: {
    /**
     * Handle the click event for the item.
     */
    click() {
      if (this.hasDropdown) {
        this.isOpened = !this.isOpened;
      } else {
        bus.$emit('click', this.$props);
        bus.$emit('hide');
      }
    },

    /**
     * Hide the dropdown menu.
     */
    hide() {
      if (this.hasDropdown) {
        this.isOpened = false;
      }
    },
  },
};
</script>
