'use-client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import AnnotatedTrick from '@/models/annotated-trick/annotated-trick';
import { Checkbox } from '../ui/checkbox';

export const columns: ColumnDef<AnnotatedTrick>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		id: 'isActive',
		cell: ({ row }) => {
			const trick = row.original;

			return <Checkbox checked={trick.isActive()} />;
		},
	},
];
