import Vue from "vue";
import App from "./App";
import Hello from "@comps/HelloWorld";
Vue.component("Hello", Hello);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
