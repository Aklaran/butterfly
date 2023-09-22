import Link from 'next/link';
import React from 'react';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Info, Menu } from 'lucide-react';

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

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

export default async function Header() {
	const session = await getServerSession(authOptions);

	return (
		<header className='h-[100px] w-[100%] bg-primary'>
			<div className='flex items-center justify-between px-5 h-[100%]'>
				<Link href='/about'>
					<Info color='white' />
				</Link>

				<h1 className='text-primary-foreground text-3xl text-center font-bold'>
					<Link href='/'>BUTTERFLY</Link>
				</h1>

				<div className='text-primary-foreground text-center'>
					{session ? (
						<Sheet>
							<SheetTrigger>
								<Menu />
							</SheetTrigger>
							<SheetContent className='w-[200px]'>
								<SheetHeader>
									<SheetTitle className='text-left'>
										{/* FIXME: Boy oh boy is that a lot of ! */}
										Hi {session.user!.name!.split(' ')[0]}!
									</SheetTitle>
								</SheetHeader>
								<ul className='h-[80%] flex flex-col justify-center gap-8 items-start'>
									{pages.map(({ label, route }) => (
										<li key={route}>
											<SheetClose asChild>
												<Link href={route}>
													{label}
												</Link>
											</SheetClose>
										</li>
									))}
								</ul>
								<SheetFooter>
									<Link
										className='text-gray-600'
										href='/api/auth/signout'
									>
										Sign Out
									</Link>
								</SheetFooter>
							</SheetContent>
						</Sheet>
					) : (
						<Link href={'/api/auth/signin'}>Sign in</Link>
					)}
				</div>
			</div>
		</header>
	);
}
