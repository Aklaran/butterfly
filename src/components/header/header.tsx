import Link from 'next/link';
import React from 'react';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Info } from 'lucide-react';

export default async function Header() {
	const session = await getServerSession(authOptions);

	return (
		<header className='h-[100px] w-[100%] bg-primary'>
			<h1 className='text-primary-foreground text-3xl text-center font-bold fixed inset-0 top-7'>
				<Link href='/'>BUTTERFLY</Link>
			</h1>
			<div className='flex items-center justify-between px-5 h-[100%]'>
				<Link href='/about'>
					<Info color='white' />
				</Link>

				<div className='text-primary-foreground text-center'>
					{session ? (
						<>
							<p>Hello {session.user?.name}!</p>
							<Link
								className='color-gray'
								href={'/api/auth/signout'}
							>
								Log Out
							</Link>
						</>
					) : (
						<Link href={'/api/auth/signin'}>Sign in</Link>
					)}
				</div>
			</div>
		</header>
	);
}
