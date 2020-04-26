import Vue from "vue";

import App from "./App";

new Vue({
  beforeCreate() {
    Vue.prototype.$globalEventBus = this;
  },
  el: "#root",
  render: (h) => h(App),
});
