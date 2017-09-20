<template>
  <nav class="Pagination pagination" :class="modifiers">
    <template v-if="hasButtons">
      <a
        class="Pagination__previous pagination-previous"
        @click="previousPage"
        :disabled="!hasPreviousPage"
      >
        Previous
      </a>
      <a
        class="Pagination__next pagination-next"
        @click="nextPage"
        :disabled="!hasNextPage"
      >
        Next
      </a>
    </template>

    <ul class="Pagination__list pagination-list">
      <template v-if="showFirstPage">
        <li>
            <a
              class="Pagination__link pagination-link"
              :title="1"
              @click="setPage($event.target.title)"
            >
              1
            </a>
        </li>
        <li v-show="showLeftEllipsis">
          <span class="Pagination__ellipsis pagination-ellipsis">&hellip;</span>
        </li>
      </template>

      <li v-for="page in visiblePages" :key="page">
        <a
          class="Pagination__link pagination-link"
          :class="{ 'is-current': page === currentPage }"
          :title="page"
          @click="setPage($event.target.title)"
        >
          {{ page }}
        </a>
      </li>

      <template v-if="showLastPage">
        <li v-show="showRightEllipsis">
          <span class="Pagination__ellipsis pagination-ellipsis">&hellip;</span>
        </li>
        <li>
            <a
              class="Pagination__link pagination-link"
              :title="lastPage"
              @click="setPage($event.target.title)"
            >
              {{ lastPage }}
            </a>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
import modifiers from '../utils/modifiers';

export default {
  name: 'pagination',
  props: {
    /**
     * The currently selected page.
     */
    currentPage: {
      type: Number,
      required: true,
    },

    /**
     * The number of items per page.
     */
    pageSize: Number,

    /**
     * The total number of items being paginated.
     */
    totalItems: Number,

    /**
     * The number of pages to pad the current page.
     */
    padding: {
      type: Number,
      default: 3,
    },

    /**
     * Determines whether to show next/previous buttons or not.
     */
    hasButtons: {
      type: Boolean,
      default: true,
    },

    /**
     * Bulma-specific options.
     */
    ...modifiers.props([...modifiers.sizes, ...modifiers.alignments]),
  },
  computed: {
    modifiers() {
      return modifiers.generate([...modifiers.sizes, ...modifiers.alignments], this.$props);
    },
    lastPage() {
      return Math.floor(this.totalItems / this.pageSize);
    },
    visiblePagesCount() {
      return Math.min((this.padding * 2) + 1, this.lastPage);
    },
    hasNextPage() {
      return this.currentPage < this.lastPage || !this.totalItems;
    },
    hasPreviousPage() {
      return this.currentPage > 1;
    },
    showFirstPage() {
      return (this.currentPage > this.padding + 1)
        && this.visiblePagesCount < this.lastPage;
    },
    showLeftEllipsis() {
      return this.visiblePages[0] > 2;
    },
    showLastPage() {
      return (this.currentPage < this.lastPage - this.padding)
        && this.visiblePagesCount < this.lastPage;
    },
    showRightEllipsis() {
      return this.visiblePages[this.visiblePagesCount - 1] < this.lastPage - 1;
    },
    visiblePages() {
      const visiblePages = [];
      if (this.currentPage <= this.padding + 1) {
        for (let i = 1; i <= this.visiblePagesCount; i += 1) {
          visiblePages.push(i);
        }
      } else if (this.currentPage >= this.lastPage - this.padding) {
        for (let i = (this.lastPage - this.visiblePagesCount) + 1; i <= this.lastPage; i += 1) {
          visiblePages.push(i);
        }
      } else {
        let i = this.currentPage - this.padding;
        for (i; i <= this.currentPage + this.padding; i += 1) {
          visiblePages.push(i);
        }
      }

      return visiblePages;
    },
  },
  methods: {
    /**
     * Cycle to next page if applicable.
     */
    nextPage() {
      if (this.hasNextPage) {
        this.$emit('update:currentPage', this.currentPage + 1);
      }
    },

    /**
     * Cycle to previous page if applicable.
     */
    previousPage() {
      if (this.hasPreviousPage) {
        this.$emit('update:currentPage', this.currentPage - 1);
      }
    },

    /**
     * Go to specific page.
     */
    setPage(page) {
      this.$emit('update:currentPage', Number(page));
    },
  },
};
</script>
