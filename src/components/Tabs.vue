<template>
  <div class="Tabs tabs" :class="modifiers">
    <ul>
      <li
        v-for="item in items"
        :class="{ 'is-active': mutableActiveItem === item.name }"
        :key="item.label"
        @click="onItemClick(item)"
      >
        <a>
          <span v-if="item.icon"
            :class="[
              'icon',
              (typeof item.icon === 'string') ? 'is-small' : item.icon.modifiers,
            ]"
          >
            <i :class="[`fa fa-${(typeof item.icon === 'string') ? item.icon : item.icon.name}`]"></i>
          </span>
          <span>{{ item.label }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import modifiers from '@/utils/modifiers';

export default {
  name: 'tabs',
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
    isCentered: Boolean,
    isRight: Boolean,
    isBoxed: Boolean,
    isToggle: Boolean,
    isFullwidth: Boolean,
    ...modifiers.sizeProps(),
  },
  data() {
    return {
      mutableActiveItem: this.activeItem,
    };
  },
  computed: {
    modifiers() {
      return {
        'is-centered': this.isCentered,
        'is-right': this.isRight,
        'is-boxed': this.isBoxed,
        'is-toggle': this.isToggle,
        'is-fullwidth': this.isFullwidth,
        ...modifiers.sizes(this.$props),
      };
    },
  },
  methods: {
    onItemClick(item) {
      if (this.mutableActiveItem !== item.name) {
        this.$emit('tabs:change', item.name);
        this.mutableActiveItem = item.name;
      }
    },
  },
};
</script>
