import {
  createRouter,
  createWebHistory
} from "vue-router";

const routes = [{
  path: '/:pathMatch(.*)*',
  redirect: '/'
}, {
  path: "/",
  name: "Home",
  component: () => import("@/views/Home.vue"),
}, {
  path: "/room:id?:game?",
  name: "Room",
  component: () => import("@/views/Room.vue"),
  beforeEnter: (to) => {
    if (to.query.id === undefined) return {
      name: 'Home'
    }
    if (to.query.game === undefined) return {
      name: 'Home'
    }
  },
}];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;