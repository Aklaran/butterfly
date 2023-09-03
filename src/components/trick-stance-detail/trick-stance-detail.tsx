'use client';
import React from 'react';

import UserTrickController from '@/controllers/user-trick-controller';
import AnnotatedTrick from '@/models/annotated-trick/annotated-trick';
import Trick from '@/models/trick/trick';

import TableItemGroup from '../table-item-group/table-item-group';
import TableItem from '../table-item/table-item';

interface TrickStanceDetailProps {
	baseTrick: Trick;
}

export default async function TrickStanceDetail({
	baseTrick,
}: TrickStanceDetailProps) {
	const userTrickController = new UserTrickController();

	const userTrick = (await userTrickController.getAllUserTricks()).find(
		(trick) => {
			return trick.trickName == baseTrick.name;
		}
	);

	const annotatedTrick = new AnnotatedTrick(baseTrick, userTrick);
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
							/>
						);
					}
				)}
			</div>
		</div>
	);
}
