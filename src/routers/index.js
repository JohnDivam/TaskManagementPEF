import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '../utils/auth';

const routes = [
    { path: '/', component:  () => import("../components/Pages/Welcome.vue"),  },
    { path: '/login', component:  () => import("../components/Pages/Auth/Login.vue"),  },
    { path: '/user/home', component:  () => import("../components/User/Home.vue"), meta: { requiresAuth: true }, },
];

const router = createRouter({
    history: createWebHistory(),
    mode: "history",
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!isAuthenticated()) {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    } else {
      next();
    }
  });

  
export default router;