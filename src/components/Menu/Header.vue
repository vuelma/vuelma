<template>
  <p
    class="Vuelma__menu-label menu-label"
    :key="name"
    v-if="label"
    v-html="label"
  ></p>
</template>

<script>
import genericItem from '../../mixins/genericItem';

export default {
  name: 'menu-header',
  mixins: [genericItem],
  props: {
    label: String,
  },
};
</script>
