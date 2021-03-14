class TasksService {
	baseURL = 'https://tasks-77ec5-default-rtdb.firebaseio.com/';

	async getTasks(authToken) {
		const res = await fetch(`${this.baseURL}/tasks.json`, {
			method: 'GET',
			headers: {
				Authorization: authToken,
			},
		});

		return (await res.json()) || {};
	}

	async addTask(authToken, task) {
		const res = await fetch(`${this.baseURL}/tasks.json`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authToken,
			},
			body: JSON.stringify(task),
		});

		return (await res.json()) || {};
	}

	async updateTask(authToken, task) {
		const res = await fetch(`${this.baseURL}/tasks/${task.id}.json`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authToken,
			},
			body: JSON.stringify(task),
		});

		return (await res.json()) || {};
	}

	async deleteTask(authToken, taskID) {
		return fetch(`${this.baseURL}/tasks/${taskID}.json`, {
			method: 'DELETE',
		});
	}
}

export default TasksService;
