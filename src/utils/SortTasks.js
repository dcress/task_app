export default class SortTasks {
	static dueDate(taskList = []) {
		return taskList.sort((a, b) => a.dateInfo?.remainingMins - b.dateInfo?.remainingMins);
	}
}
