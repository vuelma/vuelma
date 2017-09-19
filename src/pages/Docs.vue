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

    <h1 class="title is-1">Notification</h1>
    <button
      type="button"
      class="button is-primary"
      @click="showNotification = true">
      Show Notification
    </button>
    <notification
      auto-close
      is-warning
      :show.sync="showNotification"
    >
      Sample Notification
    </notification>

    <h1 class="title is-1">Pagination</h1>
    <pagination
      is-medium
      is-centered
      :current-page.sync="currentPage"
      :page-size="10"
      :total-items="1000"
      :padding="3"
    ></pagination>
  </div>
</template>

<script>
import Dropdown from '@/components/Dropdown';
import Notification from '@/components/Notification';
import Pagination from '@/components/Pagination';

export default {
  name: 'docs',
  components: {
    Dropdown,
    Notification,
    Pagination,
  },
  data() {
    return {
      showNotification: false,
      currentPage: 1,
    };
  },
};
</script>
