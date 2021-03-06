import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home";
import About from "../pages/About";
import News from "../pages/News";
import Message from "../pages/Message";
import MessageDetail from "../pages/MessageDetail";
Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: "/home",
      component: Home,
      children: [
        {
          path: "/home/news",
          component: News,
        },
        {
          path: "message",
          component: Message,
          children: [
            {
              path: "detail/:id",
              component: MessageDetail,
              props: (route) => {
                return {
                  id: +route.params.id,
                  count: +route.query.count,
                };
              },
            },
          ],
        },
        {
          path: "",
          redirect: "news",
        },
      ],
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
