export default class Task {
	id = '0';
	title = '';
	description = '';
	date = new Date().toISOString().split('T')[0];
	isCompleted = false;
}
