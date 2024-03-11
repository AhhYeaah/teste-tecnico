import { createRouter, createWebHistory } from "vue-router";
import { Routes } from "./Routes";
import SimpleLayout from "@layouts/SimpleLayout.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: Routes.HOME,
      name: "Home",
      component: () => import("@views/HomePage/HomePage.vue"),
      meta: {
        layout: SimpleLayout,
      },
    },
  ],
});
