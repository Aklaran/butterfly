'use client';
import React from 'react';

import UserTrickController from '@/controllers/user-trick-controller';
import AnnotatedTrick from '@/models/annotated-trick/annotated-trick';
import Trick from '@/models/trick/trick';
import { useMutation, useQuery } from '@tanstack/react-query';

import TableItemGroup from '../table-item-group/table-item-group';
import TableItem from '../table-item/table-item';
import { PartialUpdate } from '@/types/partial-update';

interface TrickStanceDetailProps {
	baseTrick: Trick;
}

export default function TrickStanceDetail({
	baseTrick,
}: TrickStanceDetailProps) {
	const userTrickController = new UserTrickController();

	const userTrickQuery = useQuery({
		queryKey: ['user-tricks', baseTrick.name],
		queryFn: () => userTrickController.getUserTrick(baseTrick.name),
	});

	const userTrickMutation = useMutation<
		unknown,
		unknown,
		PartialUpdate,
		unknown
	>({
		mutationFn: (partial) => {
			return userTrickController.updateUserTrick(baseTrick.name, partial);
		},
	});

	function handleLandingStanceUpdate(
		stance: string,
		currState: string[],
		isActive: boolean
	) {
		const stanceSet = new Set(currState);

		if (isActive) {
			stanceSet.add(stance);
		} else {
			stanceSet.delete(stance);
		}

		const partial = {
			landingStances: Array.from(stanceSet),
		};

		userTrickMutation.mutate(partial);
	}

	function handleEntryTransitionUpdate(
		stance: string,
		transition: string,
		currState: string[],
		isActive: boolean
	) {
		console.log(stance, transition, currState, isActive);
		const transitionSet = new Set(currState);

		if (isActive) {
			transitionSet.add(transition);
		} else {
			transitionSet.delete(transition);
		}

		const partial = {
			entryTransitions: {
				[stance]: Array.from(transitionSet),
			},
		};

		userTrickMutation.mutate(partial);
	}

	if (userTrickQuery.isLoading) {
		return <p>loading...</p>;
	}

	const annotatedTrick = new AnnotatedTrick(baseTrick, userTrickQuery.data);

	return (
		<div>
			<h2>landing stances:</h2>
			<ul>
				{annotatedTrick.trick.landingStances.map((stance) => (
					<li key={stance}>
						<TableItem
							label={stance}
							isActive={annotatedTrick.isLandingStanceActive(
								stance
							)}
							onActivePress={() =>
								handleLandingStanceUpdate(
									stance,
									annotatedTrick.userTrick!.landingStances,
									!annotatedTrick.isLandingStanceActive(
										stance
									)
								)
							}
						/>
					</li>
				))}
			</ul>
			<h2>entry transitions:</h2>
			<div>
				{Object.keys(annotatedTrick.trick.entryTransitions).map(
					(stance) => {
						return (
							<TableItemGroup
								key={stance}
								header={stance}
								items={
									annotatedTrick.trick.entryTransitions[
										stance
									]
								}
								isItemActive={
									annotatedTrick.isEntryTransitionActive
								}
								toggleItem={(transition, isActive) =>
									handleEntryTransitionUpdate(
										stance,
										transition,
										annotatedTrick.trick.entryTransitions[
											stance
										],
										isActive
									)
								}
							/>
						);
					}
				)}
			</div>
		</div>
	);
}
