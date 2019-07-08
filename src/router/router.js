import Vue from "vue";
import Router from "vue-router";
import Login from "../views/login/Login.vue";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/register/Register.vue")
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/Home.vue")
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
    },
    {
      path: "/edited",
      name: "edited",
      component: () => import("../views/edit/Edited")
    },
    {
      path: "/checked",
      name: "checked",
      component: () => import("../views/checked/Checked")
    }
  ]
});
router.beforeEach((to, from, next) => {
  let user = localStorage.getItem("user");
  if (user) {
    next();
  } else if (to.path === "/" || to.path === "/register") {
    next();
  } else {
    next("/");
  }
});
export default router;
