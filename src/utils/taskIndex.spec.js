import taskIndex from './taskIndex';

describe('Task Indexer', () => {
	const taskID = 123;
	const taskList = [
		{
			id: 345,
		},
		{
			id: 565,
		},
		{
			id: 123,
		},
		{
			id: 145,
		},
	];

	it('Is Grabbing Correct Task', () => {
		expect(taskIndex(taskList, taskID)).toBe(2);
	});
});
