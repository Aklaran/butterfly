let url = 'http://localhost:3000/api';

if (process.env.NEXT_PUBLIC_VERCEL_ENV == 'development') {
	url = 'http://localhost:3000/api';
} else if (process.env.NEXT_PUBLIC_VERCEL_ENV == 'preview') {
	url = `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}/api`;
} else if (process.env.NEXT_PUBLIC_VERCEL_ENV == 'production') {
	// FIXME: use STATIC_URL environment variable for prod API URL
	url = 'https://trickidex.vercel.app/api';
}

export const API_URL = url;
