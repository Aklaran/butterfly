import { API_URL } from '@/lib/constants';
import UserTrick from '@/models/user-trick/user-trick';
import { PartialUpdate } from '@/types/partial-update';

export default class UserTrickController {
	constructor() {}

	async getAllUserTricks() {
		console.log(process.env.STATIC_URL);
		console.log(API_URL);
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
		console.log(`controller getUserTrick(${trickName})`);
		try {
			const response = await fetch(`${API_URL}/user-tricks/${trickName}`);
			const result = (await response.json()) as UserTrick;

			return result;
		} catch (error) {
			throw new Error('Error fetching user trick:', error as Error);
		}
	}

	async createUserTrick(trickName: string) {
		console.log('creating UserTrick for', trickName);
		try {
			const response = await fetch(
				`${API_URL}/user-tricks/${trickName}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.error || 'Something went wrong');
			}

			return;
		} catch (error) {
			console.error(
				'Failed to create UserTrick:',
				(error as Error).message
			);
			throw error;
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
