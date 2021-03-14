<template>
	<div class="bg-gray-800">
		<app-header v-if="currentUser?.token" />
		<router-view />
	</div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import AppHeader from './components/AppHeader';

export default {
	components: { AppHeader },
	setup() {
		const store = useStore();
		const currentUser = computed(() => store.getters['auth/getUser']);

		return {
			currentUser,
		};
	},
};
</script>

<style src="@/assets/styles/app.css" />
