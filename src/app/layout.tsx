import '@/css/reset.css';
import '@/css/global-styles.css';

import { Inter } from 'next/font/google';
import React from 'react';

import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';
import UserIDProvider from '@/components/user-id-provider/user-id-provider';

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
				<UserIDProvider>
					<Header />
					{children}
					<Footer />
				</UserIDProvider>
			</body>
		</html>
	);
}
