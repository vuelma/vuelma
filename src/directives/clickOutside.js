export default {
  inserted: (el, binding) => {
    document.addEventListener('click', (event) => {
      const parentNodes = [];
      let node = event.target.parentNode;
      while (node) {
        parentNodes.push(node);
        node = node.parentNode;
      }

      if (!parentNodes.includes(el)) {
        binding.value();
      }
    });
  },
};
