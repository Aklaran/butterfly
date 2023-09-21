import '@/css/reset.css';
import '@/css/global-styles.css';

import React from 'react';

import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import { QueryProvider } from '@/components/providers/query-provider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Butterfly',
	// eslint-disable-next-line quotes
	description: 'Training Companion',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className='flex flex-col min-h-screen'>
				<QueryProvider>
					<Header />
					{children}
					<Footer />
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryProvider>
			</body>
		</html>
	);
}

// FIXME: RSC doesn't like the use of context that uses localStorage. Sad.
// Can solve with cookies a la: https://courses.joshwcomeau.com/joy-of-react/06-full-stack-react/11-dark-mode
// For now we're just ignoring it :3
