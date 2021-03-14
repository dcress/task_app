import UserServices from '../../../services/UserService';

const service = new UserServices();

export default {
	async login({ commit }, { email, password }) {
		try {
			const userRes = await service.login(email, password);

			commit('setUser', userRes);
		} catch (error) {
			// Show some err notification to user
			console.log(error);
		}
	},
	async logout({ commit }) {
		commit('removeUser');
	},
};
