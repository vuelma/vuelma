<template>
  <div
    class="Dropdown dropdown"
    :class="modifiers"
    v-click-outside="hide"
  >
    <div class="Dropdown__triger dropdown-trigger">
      <button
        class="Dropdown__button button"
        :class="buttonModifiers"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        @click="toggle"
      >
        <span>
          <slot name="label">
            Dropdown
          </slot>
        </span>

        <slot name="icon">
          <span class="icon is-small">
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </span>
        </slot>
      </button>
    </div>

    <div class="Dropdown__menu dropdown-menu" role="menu">
      <div class="Dropdown__content dropdown-content">
        <template v-for="item in items">
          <item
            v-bind="item"
            :key="item.name"
            :is-active="activeItem === item.name"
          ></item>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Item from './Dropdown/Item';
import modifiers from '../utils/modifiers';

const componentModifiers = [
  'is-hoverable', 'is-right',
];

export default {
  name: 'dropdown',
  components: {
    Item,
  },
  props: {
    /**
     * The items that are displayed in the dropdown menu.
     */
    items: {
      type: Array,
      required: true,
    },

    /**
     * The name of the active item.
     */
    activeItem: String,

    /**
     * Bulma modifiers to append to the button.
     */
    buttonModifiers: {
      type: [Array, String],
      default: () => ([]),
    },

    /**
     *  Bulma-specific options
     */
    ...modifiers.props(componentModifiers),
  },
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    modifiers() {
      return {
        'is-active': this.isActive,
        ...modifiers.generate([...componentModifiers], this.$props),
      };
    },
  },
  methods: {
    /**
     * Hide the dropdown menu.
     */
    hide() {
      this.isActive = false;
    },

    /**
     * Toggle the dropdown menu visibility.
     */
    toggle() {
      this.isActive = !this.isActive;
    },
  },
};
</script>
