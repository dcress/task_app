import taskIndex from '../../../utils/taskIndex';

export default {
	setTasks(state, tasks) {
		state.tasks = tasks;
	},
	addTask(state, task) {
		state.tasks.push(task);
	},
	updateTask(state, task) {
		state.tasks[taskIndex(state.tasks, task.id)] = task;
	},
	deleteTask(state, taskID) {
		delete state.tasks[taskIndex(state.tasks, taskID)];
	},
	toggleShowCompleted(state) {
		state.showCompleted = !state.showCompleted;
	},
};
