export default class UserTrickController {
	constructor() {}

	async getAllUserTricks() {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/user-tricks`
			);
			const result = await response.json();

			console.log('getAllUserTricks() fetched', result);
			return result;
		} catch (error) {
			console.error('Error fetching user tricks:', error);
			return [];
		}
	}
}
