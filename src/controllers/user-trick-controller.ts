import UserTrick from '@/models/user-trick/user-trick';

export default class UserTrickController {
	constructor() {}

	async getAllUserTricks() {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/user-tricks`
			);
			const result = (await response.json()) as UserTrick[];

			return result;
		} catch (error) {
			console.error('Error fetching user tricks:', error);
			return [];
		}
	}
}
