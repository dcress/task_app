<template>
	<div class="flex flex-col max-w-2xl min-h-screen px-4 py-3 mx-auto bg-gray-800 sm:py-12">
		<div class="flex flex-col items-center p-5 mb-10 bg-gray-700 sm:justify-between sm:flex-row">
			<!-- Note: Could add a sorting dropdown in this section using the SortTasks util -->
			<div>
				<div class="flex items-center">
					<label id="showCompleted" :class="{ 'text-opacity-50': !hasCompletedTasks }" class="text-white" for=""
						>Show completed tasks:</label
					>
					<input
						:disabled="!hasCompletedTasks"
						class="ml-2"
						:checked="showCompleted"
						:aria-checked="showCompleted"
						@change="toggleShowCompleted"
						type="checkbox"
						name=""
						id=""
						aria-labelledby="showCompleted"
					/>
				</div>
			</div>
			<router-link
				to="/tasks/0"
				class="flex-shrink-0 px-4 py-2 mt-6 ml-2 text-sm font-medium text-white transition-colors duration-75 bg-transparent border border-gray-300 rounded-lg hover:bg-gray-700 hover:border-gray-400 hover:text-gray-100 focus:outline-none sm:mt-0"
				>Add New Task</router-link
			>
		</div>
		<div v-if="taskList.length">
			<TaskListItem v-for="task in taskList" :key="task.id" :task="task" @toggleTaskStatus="toggleTaskStatus" />
		</div>
		<div v-else-if="!tasks.length">
			<EmptySplash>
				Start adding some tasks!
			</EmptySplash>
		</div>
		<div v-else>
			<EmptySplash>
				You're all caught up! Add some more!
			</EmptySplash>
		</div>
		<div class="flex justify-center mt-8">
			<router-link
				to="/tasks/0"
				class="px-4 py-2 text-sm font-medium text-white transition-colors duration-75 bg-transparent border border-gray-300 rounded-lg hover:bg-gray-700 hover:border-gray-400 hover:text-gray-100 focus:outline-none"
				>Add New Task</router-link
			>
		</div>
	</div>
</template>

<script>
import { onBeforeMount, ref, computed } from 'vue';
import { useStore } from 'vuex';
import TaskListItem from '../../components/TaskListItem';
import formatDate from '../../utils/formatDate';
import SortTasks from '../../utils/SortTasks';
import EmptySplash from '../../components/EmptySplash';

export default {
	components: { TaskListItem, EmptySplash },
	setup() {
		const store = useStore();
		const tasks = ref([]);
		const showCompleted = computed(() => store.getters['tasks/showCompleted']);
		const hasCompletedTasks = computed(() => tasks.value.some((t) => t.isCompleted));
		const taskList = computed(() => {
			return SortTasks.dueDate(tasks.value).filter((t) => showCompleted.value || !t.isCompleted);
		});

		onBeforeMount(() => {
			loadTasks();
			completedTasksToggle();
		});

		async function loadTasks() {
			if (!store.getters['tasks/tasks'].length) {
				await store.dispatch('tasks/loadTasks');
			}

			tasks.value = store.getters['tasks/tasks'];
			tasks.value.map((t) => (t.dateInfo = formatDate(t.date)));
		}

		async function toggleTaskStatus(task) {
			await store.dispatch('tasks/updateTask', task);
		}

		// -- Show Completed Tasks - Toggler Fns -- //
		function completedTasksToggle() {
			showCompleted.value = store.getters['tasks/showCompleted'];
		}

		async function toggleShowCompleted() {
			await store.dispatch('tasks/toggleShowCompleted');
		}

		return {
			tasks,
			toggleTaskStatus,
			taskList,
			toggleShowCompleted,
			hasCompletedTasks,
			showCompleted,
		};
	},
};
</script>
