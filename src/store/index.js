import { createStore } from 'vuex';
import tasksModule from './modules/tasks/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
	modules: {
		tasks: tasksModule,
		auth: authModule,
	},
});

export default store;
