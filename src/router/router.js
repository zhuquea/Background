import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue")
    },
    {
      path: "/published",
      name: "published",
      component: () => import("../views/Published.vue")
    },
    {
      path: "/statistics",
      name: "statistics",
      component: () => import("../views/Statistics.vue")
    },
    {
      path: "/publish",
      name: "publish",
      component: () => import("../views/Publish_article")
    },
    {
      path: "/label",
      name: "label",
      component: () => import("../views/Label_page")
    },
    {
      path: "/export",
      name: "export",
      component: () => import("../views/Export_excel")
    },
    {
      path: "/picture",
      name: "picture",
      component: () => import("../views/Picture_upload")
    }
  ]
});
