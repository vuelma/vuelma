/**
 * Convert the snake-cased string to title case.
 *
 * @param {string} string
 * @returns {string}
 */
function snakeToTitle(string) {
  return string.split('_').map(word => (
    word.charAt(0).toUpperCase() + word.substring(1)
  )).join(' ');
}

export default {
  props: {
    /**
     * The unique key of the component. Must be snake_cased.
     */
    name: {
      type: String,
      required: true,
    },

    /**
     * The display label of the item. If not present, use the title case of the
     * name props instead.
     */
    label: String,
  },
  computed: {
    defaultLabel() {
      if (this.label) {
        return this.label;
      }

      return snakeToTitle(this.name);
    },
  },
};
