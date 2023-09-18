let url = 'http://localhost:3000/api';

console.log(process.env.VERCEL_ENV);
console.log(process.env.NEXT_PUBLIC_VERCEL_ENV);

if (process.env.VERCEL_ENV == 'development') {
	url = 'http://localhost:3000/api';
} else if (process.env.VERCEL_ENV == 'preview') {
	url = `https://${process.env.VERCEL_BRANCH_URL}/api`;
} else if (process.env.VERCEL_ENV == 'production') {
	url = `https://${process.env.STATIC_URL}/api`;
}

export const API_URL = url;
