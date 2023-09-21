'use client';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import UserTrickController from '@/controllers/user-trick-controller';
import AnnotatedTrick from '@/models/annotated-trick/annotated-trick';
import { TrickData } from '@/models/trick/trick';
import TableItemGroup from '../table-item-group/table-item-group';
import TableItem from '../table-item/table-item';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import UserTrickData from '@/models/user-trick/user-trick-data';
import Spinner from '../spinner/spinner';

interface TrickStanceDetailProps {
	baseTrick: TrickData;
}

// HACK: Had to really hastily get around crashes due to instantiating
// Data objects with the Factory since it has mongodb specific fields.
// Need to always pass strings around the client...
// And eventually move annotation logic to the API so the client can
// be dumb as bricks.
function CreateEmpty(trickName: string, userID: string): UserTrickData {
	const entryTransitions = {
		unified: [],
		complete: [],
		hyper: [],
		semi: [],
		mega: [],
		turbo: [],
	};

	const data: UserTrickData = {
		trickName,
		user: userID,
		entryTransitions,
		landingStances: [],
	};

	return data;
}

export default function TrickStanceDetail({
	baseTrick,
}: TrickStanceDetailProps) {
	const queryClient = useQueryClient();
	const userTrickController = new UserTrickController();

	const userTrickQuery = useQuery({
		queryKey: ['user-tricks', baseTrick.name],
		queryFn: () => userTrickController.getUserTrick(baseTrick.name),
		onSettled: (data) => {
			if (data === null) {
				const optimisticUserTrick = CreateEmpty(
					baseTrick.name,
					'optimisticUser (SHOULD ONLY BE ON CLIENT LMAO)'
				);
				createUserTrickMutation.mutate(optimisticUserTrick);
			}
		},
	});

	const createUserTrickMutation = useMutation<
		unknown,
		unknown,
		UserTrickData,
		unknown
	>({
		mutationFn: () => {
			console.debug('createUserTrickMutation called');

			return userTrickController.createUserTrick(baseTrick.name);
		},
		onMutate: async (optimisticUserTrick) => {
			console.debug('createUserTrickMutation onMutate');

			// Cancel any outgoing refetches
			// (so they don't overwrite our optimistic update)
			await queryClient.cancelQueries({
				queryKey: ['user-tricks', baseTrick.name],
			});

			// Optimistically update to the new value
			queryClient.setQueryData(
				['user-tricks', baseTrick.name],
				optimisticUserTrick
			);

			console.debug(
				'After POST optimistic update, query data:',
				queryClient.getQueryData(['user-tricks', baseTrick.name])
			);

			// Return a context with the new UserTrick
			return { newUserTrick: optimisticUserTrick };
		},
		// If the mutation fails, log the error
		onError: (err) => {
			// TODO: Pop up a toast or alert
			console.error(
				`Creating UserTrick for ${baseTrick.name} failed with error:`,
				err
			);
		},
		// Always refetch after error or success:
		onSettled: () => {
			console.debug('createUserTrickMutation settled');
			queryClient.invalidateQueries({
				queryKey: ['user-tricks', baseTrick.name],
			});
		},
	});

	const updateUserTrickMutation = useMutation<
		unknown,
		unknown,
		{ oldData: UserTrickData; newData: UserTrickData },
		unknown
	>({
		mutationFn: ({ oldData, newData }) => {
			return userTrickController.updateUserTrick(
				baseTrick.name,
				oldData,
				newData
			);
		},
		onMutate: async ({ newData }) => {
			console.debug('updateUserTrickMutation onMutate');

			// Cancel any outgoing refetches
			// (so they don't overwrite our optimistic update)
			await queryClient.cancelQueries({
				queryKey: ['user-tricks', baseTrick.name],
			});

			// Optimistically update to the new value
			queryClient.setQueryData(['user-tricks', baseTrick.name], newData);
			console.debug(
				'After PATCH optimistic update, query data:',
				queryClient.getQueryData(['user-tricks', baseTrick.name])
			);

			return;
		},
		// If the mutation fails, use the context we returned above
		onError: (err, { oldData }) => {
			// TODO: Pop up a toast or alert
			console.error(
				`Updating UserTrick for ${baseTrick.name} failed with error:`,
				err
			);

			queryClient.setQueryData(['user-tricks', baseTrick.name], oldData);
		},
		// Always refetch after error or success:
		onSettled: () => {
			console.debug('updateUserTrickMutation settled');
			queryClient.invalidateQueries({
				queryKey: ['user-tricks', baseTrick.name],
			});
		},
	});

	function handleLandingStanceUpdate(
		oldData: UserTrickData,
		stance: string,
		isActive: boolean
	) {
		const newData = { ...oldData };
		const stanceSet = new Set(newData.landingStances);

		if (isActive) {
			stanceSet.add(stance);
		} else {
			stanceSet.delete(stance);
		}

		newData.landingStances = Array.from(stanceSet);

		updateUserTrickMutation.mutate({ oldData, newData });
	}

	function handleEntryTransitionUpdate(
		oldData: UserTrickData,
		stance: string,
		transition: string,
		isActive: boolean
	) {
		// Gotcha: Shallow copy with spread operator won't clone nested objects :O
		const newData = {
			...oldData,
			entryTransitions: { ...oldData.entryTransitions },
		};

		const transitionSet = new Set(newData.entryTransitions[stance]);

		if (isActive) {
			transitionSet.add(transition);
		} else {
			transitionSet.delete(transition);
		}

		newData.entryTransitions[stance] = Array.from(transitionSet);

		updateUserTrickMutation.mutate({ oldData, newData });
	}

	if (userTrickQuery.isLoading) {
		return <Spinner />;
	}

	if (userTrickQuery.isError)
		return `An error occurred: ${userTrickQuery.error}`;

	const annotatedTrick = new AnnotatedTrick(baseTrick, userTrickQuery.data);

	return (
		<div className='flex justify-center'>
			<Accordion type='multiple' className='w-[200px]'>
				<AccordionItem value='landing-stances'>
					<AccordionTrigger>Landing Stances:</AccordionTrigger>
					<AccordionContent>
						<ul>
							{annotatedTrick.trick.landingStances.map(
								(stance) => (
									<li className='py-1' key={stance}>
										<TableItem
											label={stance}
											isActive={annotatedTrick.isLandingStanceActive(
												stance
											)}
											onActivePress={() =>
												handleLandingStanceUpdate(
													annotatedTrick.userTrickData,
													stance,
													!annotatedTrick.isLandingStanceActive(
														stance
													)
												)
											}
										/>
									</li>
								)
							)}
						</ul>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value='entry-transitions'>
					<AccordionTrigger>Entry Transitions:</AccordionTrigger>
					<AccordionContent>
						<div>
							{Object.keys(
								annotatedTrick.trick.entryTransitions
							).map((stance) => {
								return (
									<TableItemGroup
										key={stance}
										header={stance}
										items={
											annotatedTrick.trick
												.entryTransitions[stance]
										}
										isItemActive={
											annotatedTrick.isEntryTransitionActive
										}
										toggleItem={(transition, targetState) =>
											handleEntryTransitionUpdate(
												annotatedTrick.userTrickData,
												stance,
												transition,
												targetState
											)
										}
									/>
								);
							})}
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
