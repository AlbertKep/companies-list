import Vue from "vue";
import VueRouter from "vue-router";

import CompaniesList from "@/views/CompaniesList";
import TheCompany from "@/views/TheCompany";

Vue.use(VueRouter);

const routes = [
  {
    path: "/companies",
    name: "Companies",
    component: CompaniesList
  },
  {
    path: "/companies/:id",
    name: "Company",
    component: TheCompany,
    beforeEnter: (to, from, next) => {
      to.params.id.length > 3 ? next({ name: "Companies" }) : next();
    }
  },
  {
    path: "/companies/*",
    redirect: "/companies",
    component: CompaniesList
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
