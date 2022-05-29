import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView
    },
    {
      path: "/:username/:repo",
      name: "repository",
      component: () => import("../views/RepositoryView.vue")
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import("../views/PageNotFoundView.vue")
    }
  ]
})

export default router
