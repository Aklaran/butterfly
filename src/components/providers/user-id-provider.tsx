// 'use client';
// import React from 'react';

// const UserIDContext = React.createContext({});

// interface UserIDProviderProps {
// 	children: React.ReactNode;
// }

// export default function UserIDProvider({ children }: UserIDProviderProps) {
// 	function getUserID() {
// 		const storedId = window.localStorage.getItem('user-id');
// 		console.log(`got userID from localstorage: ${storedId}`);
// 		return storedId ?? generateUserID();
// 	}

// 	function generateUserID() {
// 		const id = crypto.randomUUID();
// 		window.localStorage.setItem('user-id', id);
// 		console.log(`set userID in localstorage: ${id}`);
// 		return id;
// 	}

// 	return (
// 		<UserIDContext.Provider value={getUserID()}>
// 			{children}
// 		</UserIDContext.Provider>
// 	);
// }

// export function useUserID() {
// 	const data = React.useContext(UserIDContext);

// 	if (!data) {
// 		throw new Error(
// 			'Cannot consume UserID context without a UserIDProvider'
// 		);
// 	}

// 	return data;
// }
