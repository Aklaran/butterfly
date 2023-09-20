'use-client';
import React from 'react';
import { Combo } from '@/models/combo/combo';
import { ColumnDef } from '@tanstack/react-table';
import { ClipboardIcon, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const columns: ColumnDef<Combo>[] = [
	{
		accessorKey: 'text',
		header: 'Combo',
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const combo = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='h-8 w-8 p-0'>
							<span className='sr-only'>Open menu</span>
							<MoreHorizontal className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={() =>
								navigator.clipboard.writeText(combo.text)
							}
						>
							<ClipboardIcon /> Copy
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
