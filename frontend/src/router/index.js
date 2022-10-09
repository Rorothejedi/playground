import {
  createRouter,
  createWebHistory
} from "vue-router";

const routes = [{
  path: "/",
  name: "Home",
  component: () =>
    import("../views/Home.vue"),

}, {
  path: "/room/:id?",
  name: "Room",
  component: () =>
    import("../views/Room.vue"),
}];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;