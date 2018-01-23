<template>
  <div
    class="Modal modal is-active"
    v-show="show"
  >
    <div
      class="Modal__background modal-background"
      @click="(backdropClose) ? close() : () => {}"
    ></div>
    <div class="Modal__card modal-card"
      v-if="isCard"
    >
      <header
        class="Modal__head modal-card-head"
        v-if="cardHasHead"
      >
        <p class="Modal__title modal-card-title">
          <slot name="title"></slot>
        </p>

        <button
          class="delete"
          aria-label="close"
          v-if="hasClose"
          @click="close"
        ></button>
      </header>

      <section
        class="Modal__body modal-card-body"
        v-if="cardHasBody"
      >
        <slot name="body"></slot>
      </section>

      <footer
        class="Modal__foot modal-card-foot"
        v-if="cardHasFoot"
      >
        <slot name="foot"></slot>
      </footer>
    </div>

    <template v-else>
      <div class="Modal__content modal-content">
        <slot></slot>
      </div>

      <button
        class="Modal__close modal-close is-large"
        aria-label="close"
        v-if="hasClose"
        @click="close"
      ></button>
    </template>

    <input>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: {
    /**
     *  Bulma-specific options.
     */
    isCard: Boolean,
    hasClose: {
      type: Boolean,
      default: true,
    },

    /**
     * Determines whether to show the modal or not.
     */
    show: {
      type: Boolean,
      required: true,
    },

    /**
     * Determines whether to close the modal via backdrop or not.
     */
    backdropClose: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    cardHasBody() {
      return !!this.$slots.body;
    },
    cardHasFoot() {
      return !!this.$slots.foot;
    },
    cardHasHead() {
      return !!this.$slots.title || !!this.hasClose;
    },
  },
  watch: {
    show() {
      document.querySelector('html').classList.toggle('modal-opened');
      const nodes = this.$el.querySelectorAll('a, input, select, textarea, button, object');
      if (nodes.length > 1) {
        const last = nodes[nodes.length - 2];
        last.addEventListener('keydown', (event) => {
          if (event.keyCode === 9) {
            window.setTimeout(() => {
              nodes[0].focus();
            }, 0);
          }
        });
      }
    },
  },
  methods: {
    /**
     * Update show prop to close the modal.
     */
    close() {
      this.$emit('update:show', false);
    },
  },
};
</script>

<style>
.modal-opened {
  overflow: hidden;
}
</style>
