<template>
  <nav
    class="Vuelma__Breadcrumb breadcrumb"
    :class="modifiers"
    aria-label="breadcrumbs"
  >
    <ul>
      <li
        v-for="(item, index) in items"
        :key="item.name ? item.name : item.label.toLowerCase()"
        :class="{ 'is-active': index === items.length - 1 }"
      >
        <a @click="item.callback ? item.callback : () => {}">
          <span
            v-if="item.icon"
            :class="[
              'icon',
              (typeof item.icon === 'string') ? 'is-small' : item.icon.modifiers,
            ]"
          >
            <i :class="[`fa fa-${(typeof item.icon === 'string') ? item.icon : item.icon.name}`]"></i>
          </span>
          <span v-html="item.label"></span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import modifiers from '@/utils/modifiers';

const componentModifiers = [
  'has-arrow-separator', 'has-bullet-separator', 'has-dot-separator', 'has-succeeds-separator',
  ...modifiers.alignments,
  ...modifiers.sizes,
];

export default {
  name: 'vuelma-breadcrumb',
  props: {
    items: {
      type: Array,
      required: true,
    },

    /**
     *  Bulma-specific options
     */
    ...modifiers.props(componentModifiers),
  },
  computed: {
    modifiers() {
      return modifiers.generate(componentModifiers, this.$props);
    },
  },
};
</script>
