<template>
	<header class="flex flex-row items-center justify-between max-w-2xl px-2 py-4 mx-auto border-b border-gray-600">
		<h1 class="font-sans text-2xl text-gray-300">Task App</h1>
		<button
			@click="logout"
			class="px-4 py-2 text-sm font-medium text-white transition-colors duration-75 bg-transparent border border-gray-300 rounded-lg hover:bg-gray-700 hover:border-gray-400 hover:text-gray-100 focus:outline-none"
		>
			Log Out
		</button>
	</header>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
	setup() {
		const router = useRouter();
		const store = useStore();

		async function logout() {
			localStorage.clear();
			await store.dispatch('auth/logout');
			router.replace('/login');
		}

		return {
			logout,
		};
	},
};
</script>
