import UserTrick from '@/models/user-trick/user-trick';

export default class UserTrickController {
	constructor() {}

	// TODO: Add userID as parameter to these functions

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

	async getUserTrick(trickName: string): Promise<UserTrick> {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/user-tricks/${trickName}`
			);
			const result = (await response.json()) as UserTrick[];

			if (result.length > 1) {
				console.warn(
					`getUserTrick with trickName ${trickName} has more than 1 entry`
				);
			}

			return result[0];
		} catch (error) {
			throw new Error('Error fetching user trick:', error as Error);
		}
	}
}
