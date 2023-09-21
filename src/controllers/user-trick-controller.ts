import UserTrickUpdateRequest from '@/app/api/user-tricks/[trickName]/UserTrickUpdateRequest';
import { API_URL } from '@/lib/constants';
import UserTrickData from '@/models/user-trick/user-trick-data';

export default class UserTrickController {
	constructor() {}

	async getAllUserTricks() {
		console.log(process.env.STATIC_URL);
		console.log(API_URL);
		try {
			const response = await fetch(`${API_URL}/user-tricks`);
			const result = (await response.json()) as UserTrickData[];

			return result;
		} catch (error) {
			console.error('Error fetching user tricks:', error);
			return [];
		}
	}

	async getUserTrick(trickName: string): Promise<UserTrickData> {
		console.log(`controller getUserTrick(${trickName})`);
		try {
			const response = await fetch(`${API_URL}/user-tricks/${trickName}`);
			const result = (await response.json()) as UserTrickData;

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

	async updateUserTrick(
		trickName: string,
		oldData: UserTrickData,
		newData: UserTrickData
	) {
		console.debug(
			`UserTrickController.updateUserTrick(${trickName}), oldData:`,
			oldData,
			'newData:',
			newData
		);
		const updateRequests = this.createUpdateRequests(oldData, newData);

		try {
			const response = await fetch(
				`${API_URL}/user-tricks/${trickName}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(updateRequests),
				}
			);

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.error || 'Something went wrong');
			}

			const result = (await response.json()) as UserTrickData;
			return result;
		} catch (error) {
			console.error('Failed to update trick:', error);
			throw error;
		}
	}

	createUpdateRequests(
		oldData: UserTrickData,
		newData: UserTrickData
	): UserTrickUpdateRequest[] {
		const updateRequests: UserTrickUpdateRequest[] = [];

		// Handling landing stances
		const oldLandingStances = new Set(oldData.landingStances);
		const newLandingStances = new Set(newData.landingStances);

		oldLandingStances.forEach((stance) => {
			if (!newLandingStances.has(stance)) {
				updateRequests.push({
					action: 'remove',
					field: 'landingStances',
					value: stance,
				});
			}
		});

		newLandingStances.forEach((stance) => {
			if (!oldLandingStances.has(stance)) {
				updateRequests.push({
					action: 'add',
					field: 'landingStances',
					value: stance,
				});
			}
		});

		// Handling entry transitions
		Object.entries(oldData.entryTransitions).forEach(
			([stance, transitions]) => {
				const newTransitions = new Set(
					newData.entryTransitions[stance] || []
				);
				const oldTransitions = new Set(transitions);

				oldTransitions.forEach((transition) => {
					if (!newTransitions.has(transition)) {
						updateRequests.push({
							action: 'remove',
							field: 'entryTransitions',
							value: transition,
							stance: stance,
						});
					}
				});

				newTransitions.forEach((transition) => {
					if (!oldTransitions.has(transition)) {
						updateRequests.push({
							action: 'add',
							field: 'entryTransitions',
							value: transition,
							stance: stance,
						});
					}
				});
			}
		);

		console.debug('createUpdateRequest returned', updateRequests);
		return updateRequests;
	}
}
