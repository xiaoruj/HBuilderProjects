import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home";
import About from "../pages/About";

Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: "/home",
      component: Home,
    },
    {
      path: "/about",
      component: About,
    },
    {
      path: "/",
      redirect: "/home",
    },
  ],
});
export default router;
