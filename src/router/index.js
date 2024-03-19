import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/",
      name: "Dashboard",
      component: () => import("../layouts/Dashboard.vue"),
      children: [
        {
          path: "",
          name: "Home",
          component: () => import("../views/Home.vue"),
        },
        {
          path: "profile",
          name: "Profile",
          component: () => import("../views/Profile.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("../views/NotFound.vue"),
    },
  ],
});

export default router;
