import React from 'react';

interface TableProps {
	label: string;
	isActive: boolean;
}

export default function TableItem({ label, isActive }: TableProps) {
	return (
		<>
			<p>{label}</p>

			<input type='checkbox' readOnly checked={isActive} />
		</>
	);
}
