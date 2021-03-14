export default function taskIndex(tasks, taskID) {
	return tasks.findIndex((t) => t.id === taskID);
}
