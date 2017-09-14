<template>
  <transition :name="transition">
    <div
      class="Notification notification"
      :class="modifiers"
      v-show="show"
    >
      <button
        class="Notification__delete delete"
        v-if="hasCloseButton"
        @click="close"
      ></button>

      <span class="Notification__content">
        <slot></slot>
      </span>
    </div>
  </transition>
</template>

<script>
import modifiers from '@/utils/modifiers';

export default {
  name: 'notification',
  props: {
    /**
     * Show or hide the notification instance.
     */
    show: Boolean,

    /**
     * Show or hide the close button.
     */
    hasCloseButton: {
      type: Boolean,
      default: true,
    },

    /**
     * The transition to be used for animation.
     */
    transition: {
      type: String,
      default: 'fade',
    },

    /**
     * Auto-close the notification after a set timeout.
     */
    autoClose: Boolean,
    autoCloseTimeout: {
      type: Number,
      default: 8000,
    },

    /**
     * Bulma-specific modifiers
     */
    ...modifiers.props([...modifiers.colors]),
  },
  data() {
    return {
      closeTimeout: null,
    };
  },
  computed: {
    modifiers() {
      return modifiers.generate([...modifiers.colors], this.$props);
    },
  },
  watch: {
    show() {
      this.refreshTimeout();
    },
  },
  methods: {
    /**
     * Close the notification.
     */
    close() {
      this.$emit('update:show', false);
    },

    /**
     * Refresh the close timeout.
     */
    refreshTimeout() {
      if (this.autoClose) {
        clearTimeout(this.closeTimeout);
        this.closeTimeout = setTimeout(() => {
          if (this.show) {
            this.close();
          }
        }, this.autoCloseTimeout);
      }
    },
  },
};
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
