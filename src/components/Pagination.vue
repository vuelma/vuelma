<template>
  <nav class="Pagination pagination" :class="modifiers">
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

      <li v-for="page in visiblePages">
        <a
          class="Pagination__link pagination-link"
          :class="{ 'is-current': page === metadata.page }"
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
     * The pagination metadata.
     */
    metadata: {
      type: Object,
      required: true,
    },

    /**
     * The number of pages to pad the current page.
     */
    padding: {
      type: Number,
      default: 3,
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
      return Math.floor(this.metadata.totalItems / this.metadata.pageSize);
    },
    visiblePagesCount() {
      return (this.padding * 2) + 1;
    },
    hasNextPage() {
      return this.metadata.page < this.lastPage || !this.metadata.totalItems;
    },
    hasPreviousPage() {
      return this.metadata.page > 1;
    },
    hasLeftEllipsis() {
      return this.metadata.page > this.padding + 1;
    },
    hasRightEllipsis() {
      return this.metadata.page < this.lastPage - this.padding;
    },
    visiblePages() {
      const visiblePages = [];
      const { page } = this.metadata;
      if (page <= this.padding + 1) {
        for (let i = 1; i <= this.visiblePagesCount; i += 1) {
          visiblePages.push(i);
        }
      } else if (page >= this.lastPage - this.padding) {
        for (let i = (this.lastPage - this.visiblePagesCount) + 1; i <= this.lastPage; i += 1) {
          visiblePages.push(i);
        }
      } else {
        for (let i = page - this.padding; i <= page + this.padding; i += 1) {
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
        this.$emit('update:metadata', { ...this.metadata, page: this.metadata.page + 1 });
      }
    },

    /**
     * Cycle to previous page if applicable.
     */
    onPreviousClick() {
      if (this.hasPreviousPage) {
        this.$emit('update:metadata', { ...this.metadata, page: this.metadata.page - 1 });
      }
    },

    /**
     * Go to specific page.
     */
    onPageClick(event) {
      this.$emit('update:metadata', {
        ...this.metadata,
        page: parseInt(event.target.title, 10),
      });
    },
  },
};
</script>
