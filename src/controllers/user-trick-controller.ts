import { API_URL } from '@/lib/constants';
import UserTrick from '@/models/user-trick/user-trick';
import { PartialUpdate } from '@/types/partial-update';

export default class UserTrickController {
	constructor() {}

	// TODO: Add userID as parameter to these functions

	async getAllUserTricks() {
		console.log('getallUserTricks, API URL:', API_URL);
		console.log(
			'getallUserTricks, Vercel Branch ENV Var:',
			process.env.VERCEL_BRANCH_URL
		);
		try {
			const response = await fetch(`${API_URL}/user-tricks`);
			const result = (await response.json()) as UserTrick[];

			return result;
		} catch (error) {
			console.error('Error fetching user tricks:', error);
			return [];
		}
	}

	async getUserTrick(trickName: string): Promise<UserTrick> {
		try {
			const response = await fetch(`${API_URL}/user-tricks/${trickName}`);
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

	async updateUserTrick(trickName: string, partial: PartialUpdate) {
		try {
			const response = await fetch(
				`${API_URL}/user-tricks/${trickName}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(partial),
				}
			);

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.error || 'Something went wrong');
			}

			const updatedTrick = await response.json();
			return updatedTrick;
		} catch (error) {
			console.error('Failed to update trick:', error);
			throw error;
		}
	}
}
