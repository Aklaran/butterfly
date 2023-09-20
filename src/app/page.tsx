import Link from 'next/link';
import React from 'react';

export default function Home() {
	const pages = [
		{
			label: 'Tricktionary',
			route: '/tricks',
		},
		{
			label: 'Combo Generator',
			route: '/combo-gen',
		},
		{
			label: 'What is this?',
			route: '/about',
		},
	];

	return (
		<div className='h-[100%] flex justify-center'>
			<ul className='flex flex-col justify-center gap-8 items-center'>
				{pages.map(({ label, route }) => (
					<li key={route}>
						<Link href={route}>{label}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
