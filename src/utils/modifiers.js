function kebabToCamel(string) {
  return string.replace(/-[a-z]/g, matched => matched.substring(1).toUpperCase());
}

export default {
  /**
   * The modifiers available for colors.
   */
  colorModifiers: ['is-primary', 'is-info', 'is-success', 'is-warning', 'is-danger'],

  /**
   * Generate the props validation rules for color modifiers.
   *
   * @returns {object}
   */
  colorProps() {
    const props = {};
    this.colorModifiers.forEach((modifier) => {
      props[kebabToCamel(modifier)] = Boolean;
    });

    return props;
  },

  /**
   * Generate the color modifiers with the given props.
   *
   * @param {any} props
   * @returns {object}
   */
  colors(props) {
    const modifiers = {};
    this.colorModifiers.forEach((modifier) => {
      if (props[kebabToCamel(modifier)]) {
        modifiers[modifier] = true;
      }
    });

    return modifiers;
  },

  /**
   * The modifiers available for sizes.
   */
  sizeModifiers: ['is-small', 'is-medium', 'is-large'],

  /**
   * Generate the props validation rules for size modifiers.
   *
   * @returns {object}
   */
  sizeProps() {
    const props = {};
    this.colorModifiers.forEach((modifier) => {
      props[kebabToCamel(modifier)] = Boolean;
    });

    return props;
  },

  /**
   * Generate the size modifiers with the given props.
   *
   * @param {any} props
   * @returns {object}
   */
  sizes(props) {
    const modifiers = {};
    this.sizeModifiers.forEach((modifier) => {
      if (props[kebabToCamel(modifier)]) {
        modifiers[modifier] = true;
      }
    });

    return modifiers;
  },
};
