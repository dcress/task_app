import { createRouter, createWebHistory } from 'vue-router';
import store from '../store/index';

const routes = [
	{ path: '/', redirect: '/login' },
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/Login.vue'),
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('../views/Register.vue'),
	},
	{
		path: '/tasks',
		name: 'Tasks',
		component: () => import('../views/tasks/Tasks.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/tasks/:id',
		name: 'TaskDetail',
		component: () => import('../views/tasks/TaskDetail.vue'),
		meta: { requiresAuth: true },
	},
	{ path: '/:pathMatch(.*)*', redirect: '/tasks' },
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach((to, _, next) => {
	const currentUser = (() => {
		const cachedCreds = localStorage.getItem('userCreds');
		const userCache = cachedCreds ? JSON.parse(cachedCreds) : null;
		const userStore = store.getters['auth/getUser'];

		if (userStore && userStore.token) {
			return userStore;
		}
		store.commit('auth/setUser', userCache);
		return userCache;
	})();

	if (to.matched.some((r) => r.meta.requiresAuth)) {
		if (!currentUser) {
			next({
				path: '/login',
			});
			return;
		}

		next();
	} else {
		if (currentUser) {
			next({
				path: '/tasks',
			});
			return;
		}
		next();
	}
});

export default router;
