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

    <h1 class="title is-1">Tabs</h1>
    <tabs
      :items="[
        {
          name: 'home',
        },
        {
          label: 'Docs',
          name: 'docs',
          icon: 'book',
        },
        {
          label: 'File',
          name: 'file',
          icon: {
            name: 'file',
            modifiers: 'is-small',
          },
        },
      ]"
      @click:item="updateActiveTab"
      :activeItem="activeTab"
    ></tabs>

    <h1 class="title is-1">Breadcrumb</h1>
    <breadcrumb
      :items="[
        {
          name: 'vuelma_home',
          icon: 'book',
        },
        {
          label: 'Documentation',
          name: 'docs',
          icon: {
            name: 'file',
            isLarge: true,
          },
        },
        {
          name: 'file',
          icon: 'file',
        },
      ]"
      @click:item="log"
    ></breadcrumb>

    <h1 class="title is-1">Menu</h1>
    <menu-component
      should-active-parent
      :items="[
        {
          name: 'general',
          list: [
            {
              label: 'News',
              name: 'news',
            },
            {
              label: 'Consoles',
              name: 'consoles',
              transition: 'fade',
              initiallyOpened: true,
              list: [
                {
                  label: 'Switch',
                  name: 'switch',
                },
                {
                  label: 'PS4',
                  name: 'ps4',
                },
              ],
            },
          ],
        },
        {
          label: 'Support',
          name: 'support',
          list: [
            {
              name: 'docs',
            },
          ],
        },
      ]"
      :active-item="activeMenu"
      @click:item="updateActiveMenu"
    ></menu-component>

    <h1 class="title is-1">Modal</h1>
    <button
      type="button"
      class="button is-primary"
      @click="showModal = true">
      Show Modal
    </button>
    <modal
      is-card
      :has-close="false"
      :show.sync="showModal"
    >
      <template slot="body">>
        <input type="text" class="input" name="asd">
        <input type="text" class="input" name="bcd">
        <input type="text" class="input" name="efg">
      </template>
    </modal>
  </div>
</template>

<script>
import Dropdown from '@/components/Dropdown';
import Modal from '@/components/Modal';
import Notification from '@/components/Notification';
import Pagination from '@/components/Pagination';
import Tabs from '@/components/Tabs';
import Breadcrumb from '@/components/Breadcrumb';
import MenuComponent from '@/components/Menu';

export default {
  name: 'docs',
  components: {
    Dropdown,
    Modal,
    Notification,
    Pagination,
    Tabs,
    Breadcrumb,
    MenuComponent,
  },
  data() {
    return {
      showNotification: false,
      showModal: false,
      currentPage: 1,
      activeTab: '',
      activeMenu: '',
    };
  },
  methods: {
    updateActiveTab(tab) {
      this.activeTab = tab.name;
    },
    updateActiveMenu(menu) {
      this.activeMenu = menu.name;
    },
    log(item) {
      console.log(item); // eslint-disable-line
    },
  },
};
</script>
