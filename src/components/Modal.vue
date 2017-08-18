<template>
  <div
    class="Modal modal is-active"
    v-show="show"
  >
    <div class="Modal__background modal-background"></div>
    <div
      class="Modal__content modal-content"
      v-if="!isCard"
    >
      <slot name="modal-content"></slot>
    </div>
    <button
      class="Modal__close modal-close is-large"
      aria-label="close"
      v-if="!isCard"
      @click="$emit('modal:close')"
    ></button>

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
          v-if="titleHasClose"
          @click="$emit('modal:close')"
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
  </div>
</template>

<script>
export default {
  props: {
    /**
     *  Bulma-specific options.
     */
    isCard: Boolean,
    titleHasClose: {
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
  },
  computed: {
    cardHasBody() {
      return !!this.$slots.body;
    },
    cardHasFoot() {
      return !!this.$slots.foot;
    },
    cardHasHead() {
      return !!this.$slots.title || !!this.titleHasClose;
    },
  },
  watch: {
    show() {
      document.querySelector('html').classList.toggle('modal-opened');
    },
  },
};
</script>

<style>
.modal-opened {
  overflow: hidden;
}
</style>
