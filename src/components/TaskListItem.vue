<template>
	<div class="relative flex justify-between p-5 px-4 py-6 mb-5 bg-gray-100 shadow-lg rounded-xl">
		<label :for="`checkbox_${task.id}`" class="flex items-center justify-center pr-4 border-r border-gray-200">
			<input @change="toggleTask" :checked="task.isCompleted" type="checkbox" :name="`checkbox_${task.id}`" :id="`checkbox_${task.id}`" />
		</label>
		<div class="relative flex-grow px-4 py-2">
			<h2 class="text-xl font-bold">{{ task.title }}</h2>
			<p class="text-gray-600">{{ task.description }}</p>
			<time
				class="absolute text-sm text-gray-500 right-2 -top-2"
				:class="{ 'text-red-700': task.dateInfo.remainingDays < 0, 'text-yellow-600': task.dateInfo.remainingDays === 0 }"
				:datetime="task.date"
				>{{ task.dateInfo.date }}</time
			>
		</div>
		<div class="flex items-center justify-center flex-shrink-0 w-16 pl-4 overflow-hidden border-l border-gray-200">
			<router-link :to="`/tasks/${task.id}`" class="flex items-center min-h-full px-3 text-gray-400 hover:text-gray-700">
				<Edit />
			</router-link>
		</div>
	</div>
</template>

<script>
import Edit from './icons/Edit';
export default {
	emits: ['toggleTaskStatus'],
	components: { Edit },
	props: ['task'],
	setup(props, { emit }) {
		function toggleTask(event) {
			const updatedTask = Object.assign(props.task, {
				isCompleted: event.target.checked,
			});
			emit('toggleTaskStatus', updatedTask);
		}

		return {
			toggleTask,
		};
	},
};
</script>
