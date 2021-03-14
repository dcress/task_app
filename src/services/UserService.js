class UserService {
	authURL = 'https://api.dev.bambee.com/user/login';

	async login(email, password) {
		const res = await fetch(`${this.authURL}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});

		return (await res.json()) || {};
	}
}

export default UserService;
