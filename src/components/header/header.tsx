import Link from 'next/link';
import React from 'react';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function Header() {
	const session = await getServerSession(authOptions);

	return (
		<header className='h-[100px] w-[100%] bg-primary flex flex-col items-center justify-center'>
			<h1 className='text-primary-foreground text-lg font-bold'>
				<Link href='/'>BUTTERFLY</Link>
			</h1>
			{session ? (
				<div className='text-primary-foreground text-center'>
					<p>Hello {session.user?.name}!</p>
					<Link className='color-gray' href={'/api/auth/signout'}>
						Log Out
					</Link>
				</div>
			) : (
				<Link href={'/api/auth/signin'}>Sign in</Link>
			)}
		</header>
	);
}
