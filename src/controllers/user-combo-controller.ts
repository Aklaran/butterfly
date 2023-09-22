import { API_URL } from '@/lib/constants';
import { Combo, ComboData } from '@/models/combo/combo';

export default class UserComboController {
	constructor() {}

	// Fetch all user combos
	async getAllUserCombos() {
		try {
			const response = await fetch(`${API_URL}/user-combos`);
			const result = (await response.json()) as ComboData[];

			const combos = result.map((data) => new Combo(data));
			return combos;
		} catch (error) {
			console.error('Error fetching user combos:', error);
			return [];
		}
	}

	// Create a new user combo
	async createUserCombo(combo: Combo): Promise<ComboData> {
		console.log('controller createUserCombo:', combo);
		const comboData = combo.data;
		try {
			const response = await fetch(`${API_URL}/user-combos`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(comboData),
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.error || 'Something went wrong');
			}

			const result = (await response.json()) as ComboData;
			return result;
		} catch (error) {
			console.error(
				'Failed to create UserCombo:',
				(error as Error).message
			);
			throw error;
		}
	}
}
