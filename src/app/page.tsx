import Link from 'next/link';
import React from 'react';

export default function Home() {
	const pages = [
		{
			label: 'Tricktionary',
			route: '/tricks',
		},
		{
			label: 'Combos',
			route: '/combos',
		},
		{
			label: 'Combo Generator',
			route: '/combo-gen',
		},
		{
			label: 'About',
			route: '/about',
		},
	];

	return (
		<ul className='h-[80%] flex flex-col justify-center gap-8 items-center'>
			{pages.map(({ label, route }) => (
				<li key={route}>
					<Link href={route}>{label}</Link>
				</li>
			))}
		</ul>
	);
}
