import TasksServices from '../../../services/TasksService';
import Task from '../../../utils/Task';

const service = new TasksServices();

export default {
	async loadTasks({ commit }) {
		try {
			const tasks = (await service.getTasks()) || {};
			const idList = Object.keys(tasks);
			const taskList = Object.values(tasks).map((item, index) => {
				item.id = idList[index];
				return item;
			});

			commit('setTasks', taskList);
		} catch (error) {
			// Show some err notification to user
			console.log(error);
		}
	},
	async addTask({ commit }, task) {
		try {
			const taskRes = await service.addTask(null, task);
			let taskObj = task;

			taskObj.id = taskRes.name;
			commit('addTask', taskObj);
		} catch (error) {
			// Show some err notification to user
			console.log(error);
		}
	},
	async updateTask({ commit }, task) {
		try {
			const taskRes = await service.updateTask(null, task);

			if (taskRes) {
				commit('updateTask', taskRes);
			}
		} catch (error) {
			// Show some err notification to user
			console.log(error);
		}
	},
	async deleteTask({ dispatch }, taskID) {
		try {
			const taskRes = await service.deleteTask(null, taskID);

			if (taskRes.ok) {
				await dispatch('loadTasks');
			}
		} catch (error) {
			// Show some err notification to user
			console.log(error);
		}
	},
	async getTask({ getters, dispatch }, taskID) {
		try {
			const taskList = getters.tasks;

			// When loading/linking to task details page
			if (!taskList) {
				await dispatch('loadTasks');
			}
			return taskID === '0' ? new Task() : getters.tasks.find((t) => t.id === taskID);
		} catch (error) {
			// Show some err notification to user
			console.log(error);
		}
	},
	async toggleShowCompleted({ commit }) {
		commit('toggleShowCompleted');
	},
};
