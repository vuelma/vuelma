// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
Vue.directive('click-outside', {
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
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
