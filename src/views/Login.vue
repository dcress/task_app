<template>
	<div class="flex flex-col justify-center min-h-screen py-6 bg-gray-800 sm:py-12">
		<div class="relative w-full px-4 py-3 sm:max-w-lg sm:mx-auto">
			<div class="relative px-4 py-10 bg-gray-100 shadow-lg rounded-3xl sm:p-20">
				<div class="max-w-xl mx-auto">
					<h1 class="font-sans text-2xl font-bold text-center text-gray-900">LOG IN</h1>
					<form @submit.prevent="login">
						<div role="alert" class="py-4 text-center text-red-700" v-if="loginErr" :aria-errormessage="loginErr">
							{{ loginErr }}
						</div>
						<div class="divide-y divide-gray-200">
							<div class="flex flex-col py-8 space-y-4 text-base">
								<Input
									:value="email"
									type="text"
									mapsTo="email"
									name="Email"
									:required="true"
									:hasErr="hasEmailErr"
									placeholder="Email"
									:centerInput="true"
									:hideLabel="true"
									@updateValue="updateInputValue"
								/>
								<Input
									:value="password"
									type="password"
									mapsTo="password"
									name="Password"
									:required="true"
									:hasErr="hasPassErr"
									placeholder="Password"
									:centerInput="true"
									:hideLabel="true"
									@updateValue="updateInputValue"
								/>
							</div>
							<div class="pt-6 text-base font-bold leading-6 text-center sm:text-lg sm:leading-7">
								<input
									type="submit"
									value="Log In"
									class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-200"
								/>
							</div>
						</div>
						<div class="mt-5 text-center">
							<router-link to="/register" class="pt-6 text-center text-gray-500 transition-colors sm:text-md hover:text-gray-800">
								Register for a new account.
							</router-link>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import Input from '../components/forms/Input';

export default {
	components: { Input },
	setup() {
		const store = useStore();
		const router = useRouter();
		const hasEmailErr = ref(false);
		const hasPassErr = ref(false);
		const loginCreds = {
			email: ref(''),
			password: ref(''),
		};
		const loginErr = ref('');

		const login = async () => {
			const email = loginCreds.email.value;
			const password = loginCreds.password.value;
			const getUser = computed(() => store.getters['auth/getUser']);

			hasEmailErr.value = !email.length;
			hasPassErr.value = !password.length;

			if (!email.length || !password.length) {
				loginErr.value = 'Email and Password are required';
				return;
			}

			await store.dispatch('auth/login', { email, password });

			if (getUser.value.message) {
				// Some type of error
				loginErr.value = getUser.value.message;
			} else {
				localStorage.setItem('userCreds', JSON.stringify(getUser.value));
				router.replace('/tasks');
			}
		};

		function updateInputValue({ value, type }) {
			loginCreds[type].value = value;
		}

		return {
			email: loginCreds.email,
			password: loginCreds.password,
			login,
			loginErr,
			hasEmailErr,
			hasPassErr,
			updateInputValue,
		};
	},
};
</script>
