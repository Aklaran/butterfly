import React from 'react';

interface TableProps {
	label: string;
	isActive: boolean;
	onActivePress: () => void;
}

export default function TableItem({
	label,
	isActive,
	onActivePress,
}: TableProps) {
	return (
		<>
			<p>{label}</p>

			<input
				type='checkbox'
				readOnly
				checked={isActive}
				onClick={onActivePress}
			/>
		</>
	);
}
