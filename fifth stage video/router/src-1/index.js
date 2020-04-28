import Vue from "vue";

import App from "./App";

import router from "./router";

new Vue({
  el: "#root",
  render: (h) => h(App),
  // 应用router，所有组件实例对象就能直接使用router
  // 通过 this.$router / this.$route 访问
  router,
});
