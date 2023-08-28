import '@/css/reset.css';
import '@/css/global-styles.css';

import { Inter } from 'next/font/google';
import React from 'react';

import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import { QueryProvider } from '@/components/providers/query-provider';
import UserIDProvider from '@/components/providers/user-id-provider';

import type { Metadata } from 'next';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Trickidex',
	// eslint-disable-next-line quotes
	description: "Gotta land 'em all",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<QueryProvider>
					<UserIDProvider>
						<Header />
						{children}
						<Footer />
					</UserIDProvider>
				</QueryProvider>
			</body>
		</html>
	);
}

// FIXME: RSC doesn't like the use of context that uses localStorage. Sad.
// Can solve with cookies a la: https://courses.joshwcomeau.com/joy-of-react/06-full-stack-react/11-dark-mode
// For now we're just ignoring it :3
