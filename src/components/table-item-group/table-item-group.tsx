import React from 'react';

import TableItem from '../table-item/table-item';
import { DropdownMenuSeparator } from '../ui/dropdown-menu';

interface TableProps {
	header: string;
	items: string[];
	isItemActive: (s1: string, s2: string) => boolean;
	toggleItem: (label: string, isActive: boolean) => void;
}

export default function TableItemGroup({
	header,
	items,
	isItemActive,
	toggleItem,
}: TableProps) {
	return (
		<>
			<h3 className='text-center font-bold text-m'>{header}</h3>
			{items.map((item) => (
				<TableItem
					key={item}
					label={item}
					isActive={isItemActive(header, item)}
					onActivePress={() =>
						toggleItem(item, !isItemActive(header, item))
					}
				/>
			))}
			<DropdownMenuSeparator className='last:hidden' />
		</>
	);
}
