import Vue from "vue";
import App from "./App";
import store from "./store";
import myPlugin from "./plugins.myPlugin";
Vue.use(myPlugin);
Vue.globalMethod();
new Vue({
  el: "#root",
  render: (h) => h(App),
  store,
});
