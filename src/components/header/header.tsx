import Link from 'next/link';
import React from 'react';

import styles from './header.module.css';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function Header() {
	const session = await getServerSession(authOptions);

	return (
		<header className={styles.header}>
			<h1>
				<Link href='/' className={styles.homeLink}>
					TRICKIDEX
				</Link>
			</h1>
			{session ? (
				<>
					<p>Hello {session.user?.name}!</p>
					<Link href={'/api/auth/signout'}>Log Out</Link>
				</>
			) : (
				<Link href={'/api/auth/signin'}>Sign in</Link>
			)}
		</header>
	);
}
