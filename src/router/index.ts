import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SearchResult from "../views/SearchResult.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Digesto | Pesquisar Processo",
      },
    },
    {
      path: "/search/:cnj",
      name: "search",
      component: SearchResult,
      props: true,
      meta: {
        title: "Digesto | Resultado da pesquisa",
      },
    },
    {
      path: "/search",
      redirect: "/",
    },
  ],
});

export default router;
