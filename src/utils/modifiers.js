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
   * @returns {array}
   */
  colors(props) {
    const modifiers = [];
    this.colorModifiers.forEach((modifier) => {
      if (props[modifier]) {
        modifiers.push(kebabToCamel(modifier));
      }
    });

    return modifiers;
  },
};
