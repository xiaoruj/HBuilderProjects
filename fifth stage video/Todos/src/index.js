import Vue from "vue";
import App from "./App";
import "./index.css";
new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  el: "#root",
  render: (h) => h(App),
});
