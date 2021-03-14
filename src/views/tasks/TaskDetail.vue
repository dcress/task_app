<template>
	<div class="flex flex-col max-w-2xl min-h-screen px-4 py-6 mx-auto bg-gray-800 sm:py-12">
		<div class="mb-2">
			<router-link to="/tasks" class="text-sm text-gray-500 hover:text-gray-200" href="#">&#8592; All Tasks</router-link>
		</div>
		<div class="flex flex-col w-full px-4 py-5 mb-5 bg-gray-100 shadow-lg rounded-xl sm:p-6">
			<form @submit.prevent="saveTask">
				<div class="mb-3">
					<Input
						:id="task.id"
						:value="task.title"
						type="text"
						mapsTo="title"
						name="Name"
						:required="true"
						:hasErr="hasTitleErr"
						placeholder="Task Name..."
						@updateValue="updateInputValue"
					/>
				</div>
				<div class="mb-3">
					<Input
						:id="task.id"
						:value="task.description"
						type="textarea"
						mapsTo="description"
						name="Description"
						placeholder="Describe what needs to be done..."
						@updateValue="updateInputValue"
					/>
				</div>
				<div class="flex flex-col items-center sm:flex-row">
					<div class="w-full mb-3">
						<Input :id="task.id" :value="task.date" type="date" mapsTo="date" name="Date" @updateValue="updateInputValue" />
					</div>
					<div class="flex flex-row flex-row-reverse items-center justify-end w-full mt-2 sm:flex-row sm:justify-start sm:ml-5">
						<Input
							:id="task.id"
							:value="task.isCompleted"
							type="checkbox"
							mapsTo="isCompleted"
							name="Mark as completed"
							@updateValue="updateInputValue"
						/>
					</div>
				</div>
				<div class="flex items-center justify-between mt-6 sm:mt-1">
					<input
						type="submit"
						value="Save"
						class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-gray-600 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-200"
					/>
					<!-- Note: I've found this "confirm deletion" UX to be much less jarring to the user than the typical "confirmation modal" -->
					<button
						v-if="task.id !== '0'"
						@click.prevent="deleteTask"
						class="flex-shrink-0 px-4 py-2 text-base font-semibold text-white text-gray-600 bg-transparent border border-gray-600 rounded-lg shadow-md hover:border-red-600 hover:text-white hover:bg-red-600 focus:border-red-600"
					>
						{{ isConfirming ? 'Confirm Deletion' : 'Delete' }}
					</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import Input from '../../components/forms/Input';

export default {
	components: { Input },
	setup() {
		const route = useRoute();
		const router = useRouter();
		const store = useStore();
		const isConfirming = ref(false);
		const task = ref({});
		const hasTitleErr = ref(false);

		onBeforeMount(() => {
			getCurrentTask();
		});

		async function getCurrentTask() {
			// Local instance of task
			const currentTask = await store.dispatch('tasks/getTask', route.params.id);
			task.value = { ...currentTask };
		}

		async function saveTask() {
			if (!task.value.title.length) {
				hasTitleErr.value = true;
				return;
			}

			if (route.params.id !== '0') {
				await store.dispatch('tasks/updateTask', task.value);
				router.replace('/tasks');
			} else {
				await store.dispatch('tasks/addTask', task.value);
				router.replace('/tasks');
			}
		}

		async function deleteTask() {
			if (!isConfirming.value) {
				isConfirming.value = true;
				return;
			}
			await store.dispatch('tasks/deleteTask', route.params.id);
			router.replace('/tasks');
		}

		function updateInputValue({ value, type }) {
			task.value[type] = value;
		}

		return {
			route,
			task,
			saveTask,
			deleteTask,
			isConfirming,
			hasTitleErr,
			updateInputValue,
		};
	},
};
</script>
