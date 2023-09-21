'use client';
import React from 'react';

import { DataTable } from '../ui/data-table';
import { columns } from './columns';
import AnnotatedTrick from '@/models/annotated-trick/annotated-trick';
import TrickAnnotationService from '@/services/trick-annotation-service';
import { TrickData } from '@/models/trick/trick';
import { useQuery } from '@tanstack/react-query';
import UserTrickController from '@/controllers/user-trick-controller';
import Spinner from '../spinner/spinner';

// FIXME: Can I invalidate React Cache on a trick mutation instead?
// FIXME: Doesn't rerender when navigating to the page with the back button
export const dynamic = 'force-dynamic';

interface TricktionaryProps {
	baseTrickData: TrickData[];
}

export default function Tricktionary({ baseTrickData }: TricktionaryProps) {
	const userTrickController = new UserTrickController();

	const userTrickQuery = useQuery({
		queryKey: ['user-tricks'],
		queryFn: () => userTrickController.getAllUserTricks(),
	});

	if (userTrickQuery.isLoading) {
		return <Spinner />;
	}

	if (userTrickQuery.isError)
		return `An error occurred: ${userTrickQuery.error}`;

	const annotatedTrickData = new TrickAnnotationService()
		.annotateTricks(baseTrickData, userTrickQuery.data)
		.map((at) => at.data);
	const annotatedTricks = annotatedTrickData.map((data) =>
		AnnotatedTrick.fromData(data)
	);

	return (
		<div>
			<h1 className='font-bold text-lg p-2 text-center'>Tricks</h1>
			<DataTable columns={columns} data={annotatedTricks} />
		</div>
	);
}
