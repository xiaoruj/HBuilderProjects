import Vue from "vue";
import App from "./App";
new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  el: "#app",
  render: (h) => h(App),
});
