<template>
  <li :class="{ 'is-active': isActive }">
    <a @click="onItemClick">
      <icon
        v-if="hasIcon"
        :name="iconName"
        v-bind="iconModifiers"
      ></icon>
      <span v-html="label"></span>
    </a>
  </li>
</template>

<script>
import modifiers from '../../utils/modifiers';
import Icon from '../Icon';

const iconModifiers = [
  ...modifiers.sizes,
];

export default {
  name: 'tab-item',
  components: {
    Icon,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
    icon: [String, Object],
    isActive: Boolean,
  },
  computed: {
    hasIcon() {
      return (
        typeof this.icon === 'string'
        || (
          typeof this.icon === 'object'
          && this.icon.name
        )
      );
    },

    iconName() {
      if (this.hasIcon) {
        if (typeof this.icon === 'object' && this.icon.name) {
          return this.icon.name;
        }

        return this.icon;
      }

      return '';
    },

    iconModifiers() {
      if (typeof this.icon === 'object') {
        return {
          ...modifiers.generate(iconModifiers, this.icon),
        };
      }

      return {
        'is-small': true,
      };
    },
  },
  methods: {
    onItemClick() {
      this.$emit('click:item', this.$props);
    },
  },
};
</script>

