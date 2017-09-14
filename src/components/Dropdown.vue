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
        <span
          class="Dropdown__item"
          :key="item.label || item.slot"
          v-for="item in items"
          @click="click(item)"
        >
          <slot :name="item.slot">
            <hr class="Dropdown__divider dropdown-divider" v-if="item.divider">
            <a
              class="dropdown-item"
              :class="{ 'is-active': item.isActive }"
              v-else
              v-text="item.label"
            ></a>
          </slot>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dropdown',
  props: {
    /**
     * The items that are displayed in the dropdown menu.
     */
    items: {
      type: Array,
      required: true,
    },

    /**
     * Bulma-specific mofidiers.
     */
    hoverable: Boolean,
    right: Boolean,

    /**
     * Bulma modifiers to append to the button.
     */
    buttonModifiers: {
      type: [Array, String],
      default: () => ([]),
    },
  },
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    modifiers() {
      return {
        'is-hoverable': this.hoverable,
        'is-active': this.isActive,
        'is-right': this.right,
      };
    },
  },
  methods: {
    /**
     * Call the callback function of the dropdown item.
     */
    click(item) {
      if (item.hide === undefined || item.hide) {
        this.hide();
      }

      if (typeof item.click === 'function') {
        item.click(item);
      }
    },

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
