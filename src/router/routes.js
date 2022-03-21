const routes = [
  {
    path: "/",
    meta: {
      public: false,
      name: "Home",
      icon: "home",
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", name: "home", component: () => import("pages/Index.vue") },
    ],
  },
  {
    path: "/login",
    component: () => import("pages/Login.vue"),
    name: "login",
    meta: {
      public: true,
    },
  },

  // Always leave this as last one,
  // but you can also remove its
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
