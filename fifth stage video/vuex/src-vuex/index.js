import Vue from "vue";
import App from "./App";
import store from "./store";
new Vue({
  el: "#root",
  render: (h) => h(App),
  store,
});
