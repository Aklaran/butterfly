import { API_URL } from '@/lib/constants';
import Trick from '@/models/trick/trick';

export default class TrickController {
	constructor() {}

	async getAllTricks() {
		console.log('controller getAllTricks');
		try {
			console.log('fetching from', `${API_URL}/tricks`);

			const result = await fetch(`${API_URL}/tricks`).then((response) => {
				if (!response.ok) {
					throw new Error('Failed to fetch tricks');
				}

			});
			return result;
		} catch (error) {
			console.error('Error fetching tricks:', error);
			throw error;
		}
	}

	async getTrick(name: string) {
		await fetch(`${API_URL}/tricks/${name}`);
	}
}
