import SortTasks from './SortTasks';

describe('Sort Tasks', () => {
	const taskList = [
		{
			dateInfo: {
				remainingMins: 100,
			},
		},
		{
			dateInfo: {
				remainingMins: 50,
			},
		},
		{
			dateInfo: {
				remainingMins: 1,
			},
		},
		{
			dateInfo: {
				remainingMins: -10,
			},
		},
	];

	const sortedList = SortTasks.dueDate(taskList);

	it('Is Sorting Correctly', () => {
		expect(sortedList).toStrictEqual([
			{
				dateInfo: {
					remainingMins: -10,
				},
			},
			{
				dateInfo: {
					remainingMins: 1,
				},
			},
			{
				dateInfo: {
					remainingMins: 50,
				},
			},
			{
				dateInfo: {
					remainingMins: 100,
				},
			},
		]);
	});
});
