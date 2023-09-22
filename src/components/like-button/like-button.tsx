'use client';
import UserComboController from '@/controllers/user-combo-controller';
import { Combo } from '@/models/combo/combo';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import React from 'react';

export default function LikeButton({ combo }: { combo: Combo }) {
	const [isLiked, setIsLiked] = React.useState(false);

	const userComboController = new UserComboController();
	const queryClient = useQueryClient();

	useQuery({
		queryKey: ['user-combos'],
		queryFn: () => userComboController.getAllUserCombos(),
		onSuccess: (data) => {
			console.log('combo query onSuccess:', data);
			const found = data.some(
				(userCombo) => userCombo.toString() === combo.toString()
			);
			console.log('found?', found);
			setIsLiked(found);
		},
	});

	const createUserComboMutation = useMutation<
		unknown,
		unknown,
		Combo,
		unknown
	>({
		mutationFn: () => {
			console.debug('createUserComboMutation called');

			return userComboController.createUserCombo(combo);
		},
		onMutate: async (combo) => {
			console.debug('createUserComboMutation onMutate:', combo);

			// Cancel any outgoing refetches
			// (so they don't overwrite our optimistic update)
			await queryClient.cancelQueries({
				queryKey: ['user-combos'],
			});

			// Optimistically update to the new value
			setIsLiked(true);

			console.debug(
				'After POST optimistic update, query data:',
				queryClient.getQueryData(['user-combos'])
			);

			// Return a context with the new combo
			return { newCombos: [combo] };
		},
		// If the mutation fails, log the error
		onError: (err) => {
			// TODO: Pop up a toast or alert
			console.error(
				`Creating UserCombo ${combo} failed with error:`,
				err
			);
		},
		// Always refetch after error or success:
		onSettled: () => {
			console.debug('createUserComboMutation settled');
			queryClient.invalidateQueries({
				queryKey: ['user-combos'],
			});
		},
	});

	const toggleLike = () => {
		if (!isLiked) {
			createUserComboMutation.mutate(combo);
		} else {
			// TODO: Actually delete combo
			setIsLiked(false);
		}
	};

	return (
		<Heart
			onClick={toggleLike}
			color={isLiked ? 'red' : 'black'}
			fill={isLiked ? 'red' : 'none'}
		/>
	);
}
