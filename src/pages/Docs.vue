<template>
  <div class="Docs">
    <h1 class="title is-1">Dropdown</h1>
    <dropdown
      :items="[
        {
          name: 'action1',
          label: 'Action 1',
        },
        {
          name: 'divider1',
          divider: true,
        },
        {
          name: 'action2',
        },
      ]"
      :active-item="'action2'"
    >
      <template slot="label">
        My Custom Dropdown
      </template>
    </dropdown>
  </div>
</template>

<script>
import Dropdown from '@/components/Dropdown';

export default {
  name: 'docs',
  components: {
    Dropdown,
  },
};
</script>
