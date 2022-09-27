import {
  createRouter,
  createWebHistory
} from "vue-router";

const routes = [{
  path: "/morpion",
  name: "Morpion",
  component: () =>
    import("../views/Morpion.vue"),
}, {
  path: "/skyjo",
  name: "Skyjo",
  component: () =>
    import("../views/Skyjo.vue"),
}, {
  path: "/president",
  name: "President",
  component: () =>
    import("../views/President.vue"),
}];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;