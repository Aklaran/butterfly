'use-client';
import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import AnnotatedTrick from '@/models/annotated-trick/annotated-trick';
import { Checkbox } from '../ui/checkbox';
import Link from 'next/link';
import { Edit } from 'lucide-react';

export const columns: ColumnDef<AnnotatedTrick>[] = [
	{
		id: 'isActive',
		cell: ({ row }) => {
			const trick = row.original;

			return <Checkbox checked={trick.isActive()} />;
		},
	},
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		id: 'edit',
		cell: ({ row }) => {
			const trick = row.original;

			return (
				<Link href={`/tricks/${trick.name}`}>
					<Edit size={20} />
				</Link>
			);
		},
	},
];
