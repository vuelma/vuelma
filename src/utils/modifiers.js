function kebabToCamel(string) {
  return string.replace(/-[a-z]/g, matched => matched.substring(1).toUpperCase());
}

export default {
  /**
   * The modifiers available for colors.
   */
  colors: [
    'is-primary',
    'is-info',
    'is-success',
    'is-warning',
    'is-danger',
    'is-black',
    'is-dark',
    'is-white',
    'is-light',
  ],

  /**
   * The modifiers available for sizes.
   */
  sizes: ['is-small', 'is-medium', 'is-large'],

  /**
   * The modifiers available for alignments.
   */
  alignments: ['is-centered', 'is-right'],
  /**
   * Generate the props validation rules for color modifiers.
   *
   * @returns {object}
   */
  props(modifiers) {
    const props = {};
    modifiers.forEach((modifier) => {
      props[kebabToCamel(modifier)] = Boolean;
    });

    return props;
  },

  /**
   * Generate the modifiers with the given modifiers listing and props.
   *
   * @param {any} props
   * @returns {object}
   */
  generate(modifiers, props) {
    const generatedModifiers = {};
    modifiers.forEach((modifier) => {
      if (props[kebabToCamel(modifier)]) {
        generatedModifiers[modifier] = true;
      }
    });

    return generatedModifiers;
  },
};
