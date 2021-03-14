<template>
	<div class="flex flex-col justify-center min-h-screen px-4 py-6 bg-gray-800 sm:py-12">
		<div class="relative w-full py-3 sm:max-w-lg sm:mx-auto">
			<div class="relative px-4 py-10 bg-gray-100 shadow-lg rounded-3xl sm:p-20">
				<div class="max-w-xl mx-auto">
					<h1 class="font-sans text-2xl font-bold text-center text-gray-900">Register</h1>
					<form @submit.prevent="register">
						<div class="divide-y divide-gray-200">
							<div class="flex flex-col py-8 space-y-4 text-base">
								<input
									v-model="email"
									class="flex-1 w-full px-4 py-2 text-base text-center text-gray-700 placeholder-gray-400 bg-white border border-transparent rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
									type="text"
									placeholder="Email"
								/>
								<input
									v-model="password"
									class="flex-1 w-full px-4 py-2 text-base text-center text-gray-700 placeholder-gray-400 bg-white border border-transparent rounded-lg shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
									type="password"
									placeholder="Password"
								/>
							</div>
							<div class="pt-6 text-base font-bold leading-6 text-center sm:text-lg sm:leading-7">
								<button
									class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-200"
								>
									Register
								</button>
							</div>
						</div>
						<div class="mt-5 text-center">
							<router-link to="/login" class="pt-6 text-center text-gray-500 transition-colors sm:text-md hover:text-gray-800">
								Already have an account? Login.
							</router-link>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue';

export default {
	setup() {
		const email = ref('');
		const password = ref('');

		function register() {
			// Register logic would go here
			console.log(`Register ${email.value} & ${password.value}`);
		}

		return {
			email,
			password,
			register,
		};
	},
};
</script>
