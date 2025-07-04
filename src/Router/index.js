import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/home/Home.vue';
import Loginpage from '../pages/loginpage/Loginpage.vue';

const routes = [
  {
    path: '/',
    name: "HomePage",
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Loginpage',
    component: Loginpage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("token");

  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else if (to.path === '/login' && isLoggedIn) {
    next('/');
  } else {
    next();
  }
});

export default router;
