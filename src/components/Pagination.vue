<template>
  <nav class="Pagination pagination" :class="modifiers">
    <template v-if="hasButtons">
      <a
        class="Pagination__previous pagination-previous"
        @click="onPreviousClick"
        :disabled="!hasPreviousPage"
      >
        Previous
      </a>
      <a
        class="Pagination__next pagination-next"
        @click="onNextClick"
        :disabled="!hasNextPage"
      >
        Next
      </a>
    </template>

    <ul class="Pagination__list pagination-list">
      <template v-if="hasLeftEllipsis">
        <li>
            <a
              class="Pagination__link pagination-link"
              title="1"
              @click="onPageClick"
            >
              1
            </a>
        </li>
        <li><span class="Pagination__ellipsis pagination-ellipsis">&hellip;</span></li>
      </template>

      <li v-for="page in visiblePages" :key="page">
        <a
          class="Pagination__link pagination-link"
          :class="{ 'is-current': page === currentPage }"
          :title="page"
          @click="onPageClick"
        >
          {{ page }}
        </a>
      </li>

      <template v-if="hasRightEllipsis">
        <li><span class="Pagination__ellipsis pagination-ellipsis">&hellip;</span></li>
        <li>
            <a
              class="Pagination__link pagination-link"
              :title="lastPage"
              @click="onPageClick"
            >
              {{ lastPage }}
            </a>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
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
    isSmall: Boolean,
    isMedium: Boolean,
    isLarge: Boolean,
    isCentered: Boolean,
    isRight: Boolean,
  },
  computed: {
    modifiers() {
      return {
        'is-small': this.isSmall,
        'is-medium': this.isMedium,
        'is-large': this.isLarge,
        'is-centered': this.isCentered,
        'is-right': this.isRight,
      };
    },
    lastPage() {
      return Math.floor(this.totalItems / this.pageSize);
    },
    visiblePagesCount() {
      return (this.padding * 2) + 1;
    },
    hasNextPage() {
      return this.currentPage < this.lastPage || !this.totalItems;
    },
    hasPreviousPage() {
      return this.currentPage > 1;
    },
    hasLeftEllipsis() {
      return this.currentPage > this.padding + 1;
    },
    hasRightEllipsis() {
      return this.currentPage < this.lastPage - this.padding;
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
    onNextClick() {
      if (this.hasNextPage) {
        this.$emit('pagination:page', this.currentPage + 1);
      }
    },

    /**
     * Cycle to previous page if applicable.
     */
    onPreviousClick() {
      if (this.hasPreviousPage) {
        this.$emit('pagination:change', this.currentPage - 1);
      }
    },

    /**
     * Go to specific page.
     */
    onPageClick(event) {
      this.$emit('pagination:change', parseInt(event.target.title, 10));
    },
  },
};
</script>
